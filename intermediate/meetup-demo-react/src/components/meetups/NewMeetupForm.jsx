import { useRef } from "react";
import classes from "./NewMeetupForm.module.css";
import Card from "../layouts/Card";

export default function NewMeetupForm({ onAddMeetup }) {
  const titleInput = useRef();
  const imageInput = useRef();
  const addressInput = useRef();
  const descriptionInput = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredTitle = titleInput.current.value;
    const enteredImage = imageInput.current.value;
    const enteredAddress = addressInput.current.value;
    const enteredDescription = descriptionInput.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };
    onAddMeetup(meetupData);
  };

  return (
    <Card>
      <form action="" className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input
            required
            type="text"
            id="title"
            name="title"
            ref={titleInput}
            placeholder="Enter Meetup Title Here"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input
            required
            id="image"
            type="url"
            name="image"
            ref={imageInput}
            placeholder="Enter Meetup Image Here"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Meetup Address</label>
          <input
            required
            type="text"
            id="address"
            name="address"
            ref={addressInput}
            placeholder="Enter Meetup Address Here"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Meetup Description</label>
          <textarea
            rows={5}
            required
            type="text"
            id="description"
            name="description"
            ref={descriptionInput}
            placeholder="Enter Meetup Description Here"
          />
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}
