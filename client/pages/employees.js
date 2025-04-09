import Head from "next/head";
import styles from "../styles/Table.module.scss"
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3050/employees?lang=ru');
  const data = await response.json();
  if (!response.ok) {
    return {
      props: { employees: null },

    };
  }
  return {
    props: { employees: data },

  };

};

const Employees = ({ employees }) => {
  const router = useRouter();
  const handleUpdate = (language, id) => {
    router.push(`/updateEmployee/${language}.${id}`); // Переходим на страницу редактирования
  };
  // Функция для удаления сотрудника
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3050/employees/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Ошибка при удалении сотрудника, статус: ${response.status}`);
      }
      toast.success("Сотрудник успешно удалён");
      window.location.reload(); // Перезагрузка страницы после успешного удаления
    } 
    catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>

      <div>
        <Link href="/createEmployee">
          <button>Создать сотрудника</button>
        </Link>
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <caption><h2>Сотрудники</h2></caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Фото</th>
              <th>Основная информация</th>
              <th>Возможности</th>
            </tr>
          </thead>
          <tbody>
            {employees == null ? null : employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>
                  <img src={employee.photo} alt={`Фото ${employee.photo}`} style={{ width: '50px', height: 'auto' }} />
                </td>
                <td>
                  {employee.texts === null ? null : employee.texts.map((text) => (
                    <p>Имя: {text.name} <br />
                      Описание: {text.description} <br />
                      Пост: {text.post}<br />
                      Язык: {text.language} </p>
                  ))}
                </td>
                <td>
                  <button onClick={() => handleUpdate(employee.id)}>Редактировать</button>
                  <button onClick={() => handleDelete(employee.id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Employees;

// пользователь содержит: id, photo, texts(name, description, post, language)