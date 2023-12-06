import DeleteIcon from "@mui/icons-material/Delete";

export default function Note({ title, content, id, deleteNote }) {
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={() => deleteNote(id)}>
        <DeleteIcon />
      </button>
    </div>
  );
}
