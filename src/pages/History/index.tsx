import { HistoryContainer, HistoryList } from './styles'

const tasks = [
  {
    id: 3,
    task: 'Arrumar as camas',
    duration: '40 minutos',
    initial: 'Há cerca de 55 minutos',
    status: 'Concluído',
  },
  {
    id: 2,
    task: 'Limpar o fogão',
    duration: '30 minutos',
    initial: 'Há cerca de 1:30 horas',
    status: 'Concluído',
  },
  {
    id: 1,
    task: 'Lavar as louças',
    duration: '25 minutos',
    initial: 'Há cerca de 2 horas',
    status: 'Concluído',
  },
  {
    id: 0,
    task: 'Retirar o lixo',
    duration: '10 minutos',
    initial: 'Há cerca de 2:15 horas',
    status: 'Concluído',
  },
]

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td>{task.task}</td>
                  <td>{task.duration}</td>
                  <td>{task.initial}</td>
                  <td>{task.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
