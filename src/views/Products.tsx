import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateProductAvailability } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";

export async function loader() {
  const products = await getProducts();
  return products;
}

export async function action({request} : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateProductAvailability(+data.id)
  return {}
}

function Products() {

  const products = useLoaderData() as Product[];

  return (
    <>
        <div className="flex justify-between flex-col items-center gap-5 sm:flex-row">
          <h2 className="text-4xl font-black text-slate-500 text-center">Productos</h2>
          <Link
              to="/productos/nuevo"
              className="rounded-2xl bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors"
          >
              Agregar Producto
          </Link>
        </div>

        <div className="p-2">
          <table className="w-full mt-5">
            <thead className="bg-slate-800 text-white table-auto">
              <tr>
                <th className="p-2">Producto</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Disponibilidad</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <ProductDetails 
                  key={product.id}
                  product={product}
                />
              ))}
            </tbody>
          </table>
        </div>
    </>
  )
}

export default Products
