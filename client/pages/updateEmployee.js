import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UpdateEmployee = () => {
  const router = useRouter();
  const { id } = router.query;
  const [employee, setEmployee] = useState(null);

  // Загрузка данных сотрудника при первом рендеринге
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3050/employees/${language}.${id}`)
        .then((res) => res.json())
        .then((data) => setEmployee(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  // Обновляем данные сотрудника на сервере
  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedData = {
      texts: [
        {
          name: event.target.name.value,
          description: event.target.description.value,
          post: event.target.post.value,
          language: event.target.language.value,
        },
      ],
    };

    try {
      const response = await fetch(
        `http://localhost:3050/employees/${id}`,
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
          `Ошибка при обновлении сотрудника, статус: ${response.status}`
        );
      }

      alert("Изменения сохранены");
      router.push("/employees");
    } catch (error) {
      alert(error.message);
    }
  };

  // Отображение формы редактирования
  if (!employee) {
    return <div>Что то пошло не так...</div>;
  }

  return (
    <form onSubmit={handleUpdate}>
      <h2>Редактирование сотрудника</h2>
      <table>
        <tbody>
          <tr>
            <td>Имя:</td>
            <td>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={employee.texts[0].name}
              />
            </td>
          </tr>
          <tr>
            <td>Описание:</td>
            <td>
              <textarea
                id="description"
                name="description"
                defaultValue={employee.texts[0].description}
              />
            </td>
          </tr>
          <tr>
            <td>Пост:</td>
            <td>
              <input
                type="text"
                id="post"
                name="post"
                defaultValue={employee.texts[0].post}
              />
            </td>
          </tr>
          <tr>
            <td>Язык:</td>
            <td>
              <select id="language" name="language" defaultValue={employee.texts[0].language}>
                <option value="ru">Русский</option>
                <option value="en">Английский</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: "right" }}>
              <button type="submit">Сохранить изменения</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default UpdateEmployee;