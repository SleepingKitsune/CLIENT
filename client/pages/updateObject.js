import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UpdateObject = () => {
  const router = useRouter();
  const { id } = router.query;
  const [object, setObject] = useState(null);

  // Загрузка данных объекта при первом рендеринге
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3050/objects/${id}`)
        .then((res) => res.json())
        .then((data) => setObject(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  // Обновляем данные объекта на сервере
  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedData = {
      category: event.target.category.value,
      objectTexts: [
        {
          name: event.target.name.value,
          description: event.target.description.value,
          short_name: event.target.short_name.value,
          address: event.target.address.value,
          languageFK: event.target.languageFK.value,
        },
      ],
    };

    try {
      const response = await fetch(
        `http://localhost:3050/objects/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Ошибка при обновлении объекта, статус: ${response.status}`
        );
      }

      alert("Изменения сохранены");
      router.push("/"); // Возвращаемся на главную страницу после успешного обновления
    } catch (error) {
      alert(error.message);
    }
  };

  // Отображение формы редактирования
  if (!object) {
    return <div>Загрузка...</div>;
  }

  return (
    <form onSubmit={handleUpdate}>
      <h2>Редактирование объекта</h2>
      <label htmlFor="category">Категория:</label>
      <input
        type="text"
        id="category"
        name="category"
        defaultValue={object.category}
      />
      <label htmlFor="name">Название:</label>
      <input
        type="text"
        id="name"
        name="name"
        defaultValue={object.objectTexts[0].name}
      />
      <label htmlFor="description">Описание:</label>
      <textarea
        id="description"
        name="description"
        defaultValue={object.objectTexts[0].description}
      />
      <label htmlFor="short_name">Краткое название:</label>
      <input
        type="text"
        id="short_name"
        name="short_name"
        defaultValue={object.objectTexts[0].short_name}
      />
      <label htmlFor="address">Адрес:</label>
      <input
        type="text"
        id="address"
        name="address"
        defaultValue={object.objectTexts[0].address}
      />
      <label htmlFor="languageFK">Язык:</label>
      <select id="languageFK" name="languageFK" defaultValue={object.objectTexts[0].languageFK}>
        <option value="ru">Русский</option>
        <option value="en">Английский</option>
      </select>
      <button type="submit">Сохранить изменения</button>
    </form>
  );
};

export default UpdateObject;