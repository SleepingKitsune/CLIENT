import Link from "next/link";
import { useState } from "react";
import styles from "../styles/createEmployees.module.scss";
import { useRouter } from "next/router"; // Импортируем useRouter

const createEmployee = () => {
  const [photo, setPhoto] = useState(null);
  const [texts, setTexts] = useState([{ name: "", description: "", post: "", languageFK: "" }]);
  const router = useRouter(); // Инициализируем useRouter

  const handleChangeText = (index, field, value) => {
    setTexts(
      texts.map((t, i) => (i === index ? { ...t, [field]: value } : t)
      ));

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      photo: photo,
      texts: texts,
    };
    // Преобразуем объект в строку JSON
    const jsonData = JSON.stringify(data);

    try {
      const response = await fetch("http://localhost:3050/employees", {
        method: "POST",
        body: jsonData,
        headers: {
          "Content-Type": "application/json", // Указываем, что отправляем JSON
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to add employee, status: ${response.status}`);
      }

      alert("Сотрудник успешно добавлен!");
      router.push("/employees"); // Переходим на страницу /employees
    } catch (error) {
      console.error(error.message);
      alert("Произошла ошибка при добавлении сотрудника.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <Link href="/employees">
        <button className={styles.backButton}>Вернуться</button>
      </Link>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className="text-center">Создание пользователя</h2>
        <label>
          Фото*:
          <input
            type="text"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.value)}
          />
        </label>
        {texts.map((text, index) => (
          <div key={index}>
            <label>
              Имя*:
              <input
                type="text"
                value={text.name}
                onChange={(e) =>
                  handleChangeText(index, "name", e.target.value)
                }
                required
              />
            </label>
            <label>
              Описание*:
              <textarea
                rows="4"
                cols="50"
                value={text.description}
                onChange={(e) =>
                  handleChangeText(index, "description", e.target.value)
                }
                required
              />
            </label>
            <label>
              Пост*:
              <input
                type="text"
                value={text.post}
                onChange={(e) =>
                  handleChangeText(index, "post", e.target.value)
                }
                required
              />
            </label>
            <label>
              Язык*:
              <select
                value={text.languageFK}
                onChange={(e) =>
                  handleChangeText(index, "languageFK", e.target.value)
                }
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

export default createEmployee;