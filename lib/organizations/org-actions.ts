"use server";

import { auth } from "../auth";
import { headers } from "next/headers";
import db from "../db";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

/**
 * Retrieves all organizations in the system with member counts,
 * and whether the currently authenticated user is a member.
 */
export async function getAllOrganizationsAction() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "You must be logged in to view organizations.",
        organizations: [],
      };
    }

    const userId = session.user.id;

    // Fetch all organizations and include their members
    const orgs = await db.organization.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        createdAt: true,
        members: {
          select: {
            userId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedOrgs = orgs.map((org) => ({
      id: org.id,
      name: org.name,
      slug: org.slug,
      createdAt: org.createdAt.toISOString(),
      memberCount: org.members.length,
      isMember: org.members.some((m) => m.userId === userId),
    }));

    return {
      success: true,
      organizations: formattedOrgs,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch organization list.",
      organizations: [],
    };
  }
}

/**
 * Joins the current user to an organization by creating a Member record.
 */
export async function joinOrganizationAction(orgId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "You must be logged in to join an organization.",
      };
    }

    const userId = session.user.id;

    // Verify organization exists
    const org = await db.organization.findUnique({
      where: { id: orgId },
    });

    if (!org) {
      return {
        success: false,
        message: "Organization not found.",
      };
    }

    // Check if already a member
    const existingMember = await db.member.findFirst({
      where: {
        organizationId: orgId,
        userId: userId,
      },
    });

    if (existingMember) {
      return {
        success: true,
        message: "You are already a member of this organization.",
      };
    }

    // Generate unique ID in the format expected by Better-Auth (a unique alphanumeric string)
    const memberId = crypto.randomUUID().replace(/-/g, "");

    // Create the Member record
    await db.member.create({
      data: {
        id: memberId,
        organizationId: orgId,
        userId: userId,
        role: "member",
        createdAt: new Date(),
      },
    });

    revalidatePath("/");
    
    return {
      success: true,
      message: `Successfully joined ${org.name}!`,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while joining the organization.",
    };
  }
}
