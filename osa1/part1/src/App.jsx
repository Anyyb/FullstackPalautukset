const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts:[
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const totalExercises = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;
 

  return (
    <div>
      <Header course={course} />
      {/* Step1 ja 2 (1.1-1.2):
      <Content content={part1} ex={exercises1} />
      <Content content={part2} ex={exercises2} />
      <Content content={part3} ex={exercises3} />
      */}

       {/*App komponentti on asetettu käyttämään Content komponenttia ja sille on asetettu course oliossa oleva lista parts, joka sisältää tiedot. */}
      <Content part={course.parts} />
      <Total total={totalExercises} />
    </div>
  )
}
const Header = (props) => {
  return (
    <div>
      <p>Course: {props.course.name}</p>  
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
      <Part name={props.part[0].name} exercises={props.part[0].exercises} />
      <Part name={props.part[1].name} exercises={props.part[1].exercises} />
      <Part name={props.part[2].name} exercises={props.part[2].exercises} />
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
