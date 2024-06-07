const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }
  return (
    <div>
      <Course course={course} />
    </div>
  )
}
{/* Course komponentti käyttää header ja content komponentteja nimen ja osien renderöintiin.*/}
const Course = (props) => {
  console.log("Coursen propsit", props)
  const { course } = props
  return (
    <div>
       <Header course={course} /> 
       <Content parts={course.parts} /> 
       <Total parts={course.parts} />
    </div>
  )
}
{/* Header komponentti kertoo miten kurssin nimi renderöidään */}
const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>  
    </div>
  )
}
{/* Content komponentti käyttää propseja välittääkseen tiedon Course komponentille. 
Se käyttää map-metodia käydäkseen listan parts osiot läpi ja luodakseen uuden (id,name,exercises) näkymän seuraavalle osalle,
jos lisätään tai poistetaan listalta elementti. */}
const Content = (props) => {
  console.log("Content propsit",props)
  const { parts } = props;
  return (
    <div>
       {parts.map(parts => (
       <Part key={parts.id} name={parts.name} exercises={parts.exercises} /> 
  ))
  }
  </div>
  )
}
 {/* Part komponenttiin on määritetty, miten yksi osa renderöidään. */}
 const Part = (props) => {
  return (
    <div>
    <h4> Content: {props.name} <br></br>Exercises: {props.exercises} </h4>
    </div>
  );
};
{/* Total on määritelty renderöimään tehtävien yhteismäärä, jonka se laskee reduce metodilla.*/}
const Total = (props) => {
  const { parts} = props;

  const total = parts.reduce( (accumulator, reduce) => {
    console.log('what is happening', accumulator, reduce)
    return accumulator + reduce.exercises},0)
    console.log("sum of exercises is",total)

  return (
    <div>
      <h4> Total number of exercises: {total}</h4>
    </div>
  )
}
export default App