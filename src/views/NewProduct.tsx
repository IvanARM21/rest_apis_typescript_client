import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error = '';
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
        return error;
    }

    await addProduct(data);

    return redirect('/');
}

function NewProduct() {

    const error = useActionData() as string;

    console.log(error)

  return (
    <>
        <div className="flex justify-between flex-col items-center gap-5 sm:flex-row mb-5">
            <h2 className="text-4xl font-black text-slate-500 text-center">Registrar Producto</h2>
            <Link
                to="/"
                className="rounded-2xl bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
                Volver a Productos
            </Link>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form
            method="POST"
        >
            <ProductForm />
            <input
                type="submit"
                className="mt-5 bg-indigo-600 p-3 text-white font-bold text-lg cursor-pointer rounded-2xl w-full sm:w-fit hover:bg-indigo-700 transition-colors"
                value="Registrar Producto"
            />
        </Form>
    </>
  )
}

export default NewProduct
