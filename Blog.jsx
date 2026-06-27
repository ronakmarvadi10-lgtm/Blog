import React, { useState, useEffect } from "react";

export default function ProductPage() {
  const [obj, setObj] = useState({ title: "", image: "", blog: "" });
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(-1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("blogs")) || []);
  }, []);

  const change = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const save = (e) => {
    e.preventDefault();

    if (!obj.title || !obj.image || !obj.blog) {
      alert("Fill all");
      return;
    }

    let arr = [...data];

    if (edit >= 0) {
      arr[edit] = obj;
      setEdit(-1);
    } else {
      arr.push(obj);
    }

    setData(arr);
    localStorage.setItem("blogs", JSON.stringify(arr));
    setObj({ title: "", image: "", blog: "" });
  };

  const del = (i) => {
    let arr = data.filter((_, index) => index !== i);
    setData(arr);
    localStorage.setItem("blogs", JSON.stringify(arr));
  };

  const editData = (i) => {
    setObj(data[i]);
    setEdit(i);
  };

  let show = data.filter((x) =>
    x.title.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "az") show.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "za") show.sort((a, b) => b.title.localeCompare(a.title));

  return (
    <div style={{ width: "700px", margin: "20px auto", fontFamily: "Arial" }}>
      <h2>Blog Manager</h2>

      <form onSubmit={save}>
        <input name="title" placeholder="Title" value={obj.title} onChange={change} /><br /><br />
        <input name="image" placeholder="Image URL" value={obj.image} onChange={change} /><br /><br />
        <textarea name="blog" placeholder="Blog" value={obj.blog} onChange={change}></textarea><br /><br />
        <button>{edit >= 0 ? "Update" : "Add"}</button>
      </form>

      <br />

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>

      <hr />

      {show.length === 0 ? (
        <h3>No Data</h3>
      ) : (
        show.map((item, i) => (
          <div key={i} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
            <img src={item.image} alt="" width="200" /><br />
            <h3>{item.title}</h3>
            <p>{item.blog}</p>

            <button onClick={() => editData(i)}>Edit</button>
            <button onClick={() => del(i)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
