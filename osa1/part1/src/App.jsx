const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const totalExercises = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header course={course} />
      <Content content={part1} ex={exercises1} />
      <Content content={part2} ex={exercises2} />
      <Content content={part3} ex={exercises3} />
      <Total total={totalExercises} />
    </div>
  )
}
const Header = (props) => {
  return (
    <div>
      <p>Course: {props.course}</p>
      
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
    <p> Content: {props.content}, {props.ex}</p>
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
      <p> Total number of exercises: {props.total}</p>
    </div>
  )
}

export default App
