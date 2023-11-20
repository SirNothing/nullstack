export const Course = ({ courses }) => {
  
  return( <>
      { courses.map( (cour) => <Header key={ cour.id } header={ cour.name } parts={ cour.parts}/> ) }
    
  </> )
}

const Header = ({ header, parts}) => {
  return( <>
    <h2> { header } </h2>
    <Content content={ parts } /> 
    <Total total={ parts.map( (part) => part.exercises ).reduce( (acc, curr) => acc + curr) } />

  </> )
}

const Content = ( { content } ) => {
 
  return( <> 
    <ul>
      { content.map( (part) => <Part key={ part.id } part={ part } /> ) }
    </ul>
  </> )
}

const Part = ( { part } ) => {
 
  return( <> 
    <li> { part.name } { part.exercises } </li>
  </> )
}

const Total = ( { total } ) => {
  console.log(toString(total))
  return( <> 
    <b> total of { total } exercises </b>
  </> )
}
Course
