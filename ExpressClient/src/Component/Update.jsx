import { useLoaderData } from "react-router-dom";

const Update = () => {

  const loadUser = useLoaderData();


  const handleUpdateUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    console.log(loadUser._id);
    const updateUser = { name, email }

    fetch(`http://localhost:5000/users/${loadUser._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updateUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })

  }

  return (
    <>
      <h3>Update Info</h3>
      <form onSubmit={handleUpdateUser}>
        <input type="text" name="name" defaultValue={loadUser?.name} id="" />
        <br />
        <input type="text" name="email" defaultValue={loadUser?.email} id="" />
        <br />
        <input type="submit" value="Update" />
      </form>
    </>
  );
};

export default Update;