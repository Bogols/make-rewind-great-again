import { useForm } from "react-hook-form";
import { type FocusEvent } from "react";
import { useAppContext } from "~/context/AppContext";

export type FormValues = {
  user: string;
  messageContent: string;
};
function PasteForm() {
  const { register, setValue, getValues, reset } = useForm<FormValues>();
  const { setRewind } = useAppContext();

  const handlePaste = async (event: FocusEvent<HTMLInputElement>) => {
    await navigator.clipboard
      .readText()
      .then((text) => (event.target.value = text))
      .then((text) => setValue("messageContent", text))
      .then(() => getValues())
      .then((result) => setRewind((prevState) => [...prevState, result]))
      .finally(() => reset());
  };

  return (
    <form className="flex w-1/2 flex-col items-center px-5">
      <div className="form-control w-1/2">
        <label className="label cursor-pointer">
          <span className="label-text">zer0xday</span>
          <input
            type="radio"
            className="radio checked:bg-red-500"
            id="zer0xday"
            value="zer0xday"
            {...register("user")}
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">rot4ry</span>
          <input
            type="radio"
            className="radio checked:bg-red-500"
            id="rot4ry"
            value="rot4ry"
            {...register("user")}
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">typeWolffo</span>
          <input
            type="radio"
            className="radio checked:bg-red-500"
            id="typeWolffo"
            value="typeWolffo"
            {...register("user")}
          />
        </label>
      </div>
      <input
        type="text"
        placeholder="Click here"
        className="input-bordered input-accent input mt-5 w-full max-w-xs"
        {...register("messageContent")}
        id="messageContent"
        onFocus={(event) => void handlePaste(event)}
      />
    </form>
  );
}
export default PasteForm;
