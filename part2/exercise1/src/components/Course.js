import React from 'react'


const Course = ({course}) => {
    const courseone = course[0]
    const coursetwo = course[1]
     return (
       <div>
         <Header header={courseone} />
         <Content content={courseone} />
         <Total total={courseone} /> 
         <Other other={coursetwo} /> 
         <TotalOne otherOne={coursetwo} /> 
       </div>
     )
   }
   
   const TotalOne = ({otherOne}) =>{
     const othernews = otherOne.parts
     return (
     <div>
       <strong>
         total of {othernews.reduce((s,p) => {
           return s + p.exercises 
         }, 0)} exercises
       </strong>
     </div>
     )
   }
   
   const Other = ({other}) =>{
     const othernews = other.parts
     return(
       <div>
         <h4>{other.name} </h4>
        {othernews.map((othernew,i) => <p key={i} >{othernew.name} {othernew.exercises}</p>)}
       </div>
     )
   }
   
   const Total = ({total}) =>{
     const tota = total.parts
   
     return(
       <div>
         <strong> 
         total of {tota.reduce((s,p) => {
          return s + p.exercises
        }, 0)  } exercises
         </strong >
       </div>
     )
   }
   
   const Header = ({header}) => {
     // console.log(header)
     return (
       <div>
         <h1>{header.name}</h1>
       </div>
     )
   };
   
   const Content = ({content}) => {
   // console.log(content.parts)
   const conte = content.parts
     return (
       <div>
         {conte.map((cont,i) =>  <Part key={i} cont={cont} />)}
       </div>
     )
   };
   
   const Part = ({cont}) =>{
     // console.log(cont)
     return(
       <div>
         <p>{cont.name} {cont.exercises} </p>
       </div>
     )
   }
   
export default Course;   
