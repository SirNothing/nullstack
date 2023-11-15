const Header = (props) => {
	
	console.log(props.course + " headeri")
	const header = props.course
	return( <> { header } </> )

}

const Content = (props) => {
	
	console.log(props.part)
	return( <>
		<ul>
		{ props.part.map((par, i) => <li key={i}> {par.part1} {par.exercises1} </li>) } 
		</ul>
		</> )
}

const Total = (props) => {
	
	console.log(props.total)
	return( <>
		<b> Total exercises: </b> {props.total}
		</> )
}

const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
	  <Header course={course} />
	  <Content part={[ { "part1": part1, "exercises1": exercises1 }, { 
	  "part1": part2, "exercises1": exercises2 }, { "part1": part3, "exercises1": exercises3 }] } />
	  <Total total={ exercises1 + exercises2 + exercises3 } />
    </div>
  )
}

export default App
