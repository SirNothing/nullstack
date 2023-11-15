const Header = (props) => {
	
	console.log(props.course + " headeri")
	const header = props.course
	return( <> { header } <br></br></> )

}

const Content = (props) => {
	
	console.log(props.part)
	return( <>
		<Part part={props.parts[0]} />
		<Part part={props.parts[1]} />
		<Part part={props.parts[2]} />
		</> )
}

const Part = (props) => {

	return( <>
		<b> { props.part.name } </b> { props.part.exercises } <br></br>
	</> )
}

const Total = (props) => {
	
	console.log(props.total)
	const total = props.total[0].exercises + props.total[1].exercises + props.total[2].exercises 
	return( <>
		<b> Total exercises: </b> {total}
		</> )
}

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
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

  return (
    <div>
	  <Header course={ course.name } />
	  <Content parts={ course.parts } />
	  <Total total={ course.parts } />
    </div>
  )
}

export default App
