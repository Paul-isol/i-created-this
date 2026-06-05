import { getFeaturedProducts } from "@/lib/products/products-select";


export const generateStaticParams = async () => {
  const products = await getFeaturedProducts()
  return products.map((product) => ({
    id: product.id.toString()
  }))
}

export default async function ProductPage({ params }: { params:Promise<{id: string}>}) {
  const {id} = await params
  return <div>ProductPage</div>;
}