import { redirect } from "next/navigation";
import api from "@/api";

export const dynamic = "force-static";

export default async function HomePage() {
  const messages = await api.message.list();

  async function add(formData: FormData) {
    "use server";

    const message = formData.get("message") as string;
    const id = formData.get("id") as string;
    const unit_price = Number(formData.get("unit_price"));
    const quantity = Number(formData.get("quantity"));
    const title = formData.get("title") as string;
    const currency_id = formData.get("currency_id") as string;

    const url = await api.message.submit(
      message,
      id,
      unit_price,
      quantity,
      title,
      currency_id
    );

    redirect(url);
  }

  return (
    <section className="grid gap-8">
      <form action={add} className="flex flex-col gap-4 max-w-sm">
        <input type="text" name="message" placeholder="Message" required />
        <input type="number" name="id" placeholder="ID" required />
        <input type="number" name="unit_price" placeholder="Unit Price" required />
        <input type="number" name="quantity" placeholder="Quantity" required />
        <input type="text" name="title" placeholder="Title" required />
        <input type="text" name="currency_id" placeholder="Currency ID" required />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Enviar
        </button>
      </form>

      <ul className="list-disc pl-4">
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </section>
  );
}
