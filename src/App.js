// App.js
import { useGetCardsQuery, useChangeCardMutation, useAddCardMutation } from "./api/apiSlice";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, reset } = useForm();
  const { data: cards, isFetching } = useGetCardsQuery();
  const [changeCard, { isLoading: isUpdating }] = useChangeCardMutation();
  const [addCard, { isLoading: isAdding }] = useAddCardMutation();

  const onSubmit = async ({ id, title, value }) => {
    try {
      if (id) {
        await changeCard({ id, title, value }).unwrap();
        console.log("Card updated successfully");
      } else {
        await addCard({ title, value }).unwrap();
        console.log("New card added successfully");
      }
      reset();  // Clear the form after updating
    } catch (error) {
      console.error("Failed to update/add card:", error);
    }
  };

  return (
    <div>
      {isFetching ? (
        "Loading..."
      ) : (
        cards?.map((card) => (
          <p key={card.id}>
            {card.title}
          </p>
        ))
      )}

      {/* Form to add or update a card */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Field for Card ID (optional, only for updating) */}
        <input type="text" placeholder="Card ID (optional for updating)" {...register("id")} />
        {/* Field for card title (required for both adding and updating) */}
        <input type="text" placeholder="Card Title" {...register("title")} required />
        <input type="text" placeholder="Card Value" {...register("value")} required />
        <button type="submit" disabled={isUpdating || isAdding}>
          {isUpdating ? "Updating..." : isAdding ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default App;
