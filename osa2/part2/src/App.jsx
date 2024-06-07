const App = () => {
  const courses = [
    {
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <Course course={courses} />
    </div>
  )
}
{/* Course komponentti käyttää header content ja total komponentteja nimen, osien ja tehtävien summan renderöintiin.*/}
const Course = (props) => {
  console.log("Coursen propsit", props)
  const { course } = props
  return (
    <div>
      {/* Course komponentti käyttää map-metodia ja id avainta päästäkseen käsiksi listan jokaisen kurssin tietoihin 
      käsiteltäessä osioita ja luodessa uusia osioita.*/}
        {course.map(course => 
          <div key={course.id}>
             <Header course={course} /> 
             <Content parts={course.parts} /> 
             <Total parts={course.parts} />
          </div>
        )}
      
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