const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const totalExercises = part1.exercises + part2.exercises + part3.exercises;
 

  return (
    <div>
      <Header course={course} />
      {/* Step1 ja 2 (1.1-1.2):
      <Content content={part1} ex={exercises1} />
      <Content content={part2} ex={exercises2} />
      <Content content={part3} ex={exercises3} />
      */}

       {/*App komponentti on asetettu käyttämään Content komponenttia ja sille on asetettu oikeat osiot sekä tehtävät. */}
      <Content 
        part1={part1} 
        part2={part2} 
        part3={part3} />
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
{/* Part komponenttiin on määritetty, miten yksi osa renderöidään. */}
const Part = (props) => {
  return (
    <div>
    <p> Content: {props.name} <br></br>Exercises: {props.exercises} </p>
    </div>
  );
};
 {/* Content komponentti käyttää propseja ja part komponenttia renderöidäkseen tiedot 3 riviin. */}
const Content = (props) => {
  return (
    <div>
      {/* Step1 ja 2 (1.1-1.2): <p> Content: {props.content}, {props.ex}</p> */}
      <Part name={props.part1.name} exercises={props.part1.exercises} />
      <Part name={props.part2.name} exercises={props.part2.exercises} />
      <Part name={props.part3.name} exercises={props.part3.exercises} />
    </div>
  )
}
 {/* Total on määritelty renderöimään tehtävien yhteismäärä*/}
const Total = (props) => {
  return (
    <div>
      <p> Total number of exercises: {props.total}</p>
    </div>
  )
}
export default App
