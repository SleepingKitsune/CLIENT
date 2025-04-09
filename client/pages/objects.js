import Head from "next/head";
import styles from "../styles/Table.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3050/objects?lang=ru");

  const data = await response.json();
  if (!response.ok) {
    return {
      props: { objects: null },
  
    };
  }
  return {
    props: { objects: data },

  };
};

const Objects = ({ objects }) => {
  const router = useRouter();

  const handleUpdate = (id) => {
    router.push(`/updateObject/${id}`); // Переходим на страницу редактирования объекта
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3050/objects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Ошибка при удалении объекта, статус: ${response.status}`);
      }

      alert("Объект успешно удалён");
      window.location.reload(); // Перезагрузка страницы после успешного удаления
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div>
        <Link href="/createObject">
          <button>Создать объект</button>
        </Link>
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <caption>
            <h2>Объекты</h2>
          </caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Категория</th>
              <th>Название</th>
              <th>Описание</th>
              <th>Краткое название</th>
              <th>Адрес</th>
              <th>Язык</th>
              <th>Возможности</th>
            </tr>
          </thead>
          <tbody>
            {objects == null? null :  objects.map((obj) => (
              <tr key={obj.id}>
                <td>{obj.id}</td>
                <td>{obj.category}</td>
                <td>
                  {obj.objectTexts.length > 0 &&
                    obj.objectTexts.map((text) => (
                      <p>
                        Название: {text.name}
                        <br />
                        Описание: {text.description}
                        <br />
                        Краткое название: {text.short_name}
                        <br />
                        Адрес: {text.address}
                        <br />
                        Язык: {text.languageFK}
                      </p>
                    ))}
                </td>
                <td>
                  <button onClick={() => handleUpdate(obj.id)}>Редактировать</button>
                  <button onClick={() => handleDelete(obj.id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Objects;