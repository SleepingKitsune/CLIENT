import { useState } from "react";
import styles from "../styles/createEmployees.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

const createObject = () => {
  const [category, setCategory] = useState("");
  const [photos, setPhotos] = useState([]); // Массив для фотографий
  const [texts, setTexts] = useState([{
    name: "",
    description: "",
    short_name: "",
    address: "",
    languageFK: ""
  }]); // Начальный массив для одного текста
  const router = useRouter();

  // Обработчик для добавления новых фотографий
  const handleAddPhoto = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  // Обработчик для изменения текста
  const handleChangeText = (index, field, value) => {
    setTexts(
      texts.map((t, i) => i === index ? { ...t, [field]: value } : t)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      category,
      objectPhoto: photos.map(photo => ({ link: photo.name })), // Форматируем фотографии
      objectTexts: texts
    };

    const formData = new FormData();
    formData.append("category", category);
    photos.forEach((photo, index) => {
      formData.append(`objectPhoto[${index}][link]`, photo.name); // Отправляем каждую фотографию
    });
    texts.forEach((text, index) => {
      Object.keys(text).forEach(key => {
        formData.append(`objectTexts[${index}][${key}]`, text[key]);
      });
    });

    try {
      const response = await fetch("http://localhost:3050/objects", {
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": "application/json", // Указываем, что отправляем JSON
          },
      });

      if (!response.ok) {
        throw new Error(`Failed to add object, status: ${response.status}`);
      }

      alert("Объект успешно добавлен!");
      router.push("/objects"); // Переходим на страницу /objects
    } catch (error) {
      console.error(error.message);
      alert("Произошла ошибка при добавлении объекта.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className="text-center">Создание объекта</h2>
        <Link href="/objects">
          <button className={styles.backButton}>Вернуться</button>
        </Link>
        <label>
          Категория:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <label>
          Фотографии:
          <input
            type="file"
            multiple
            onChange={handleAddPhoto}
          />
        </label>
        {texts.map((text, index) => (
          <div key={index}>
            <label>
              Название:
              <input
                type="text"
                value={text.name}
                onChange={(e) => handleChangeText(index, "name", e.target.value)}
                required
              />
            </label>
            <label>
              Описание:
              <textarea
                rows="4"
                cols="50"
                value={text.description}
                onChange={(e) => handleChangeText(index, "description", e.target.value)}
                required
              />
            </label>
            <label>
              Краткое название:
              <input
                type="text"
                value={text.short_name}
                onChange={(e) => handleChangeText(index, "short_name", e.target.value)}
                required
              />
            </label>
            <label>
              Адрес:
              <input
                type="text"
                value={text.address}
                onChange={(e) => handleChangeText(index, "address", e.target.value)}
                required
              />
            </label>
            <label>
              Язык:
              <select
                value={text.languageFK}
                onChange={(e) => handleChangeText(index, "languageFK", e.target.value)}
                required
              >
                <option value="">Выберите язык...</option>
                <option value="ru">Русский</option>
                <option value="en">Английский</option>
              </select>
            </label>
          </div>
        ))}
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default createObject;