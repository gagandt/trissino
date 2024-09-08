import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-start h-screen'>
     
     <p>search term: input</p>
     <p>search location: select (US Cities)</p>
     <p>keywords: comma separated list, input</p>


    <p className='text-lg font-semibold'>multiple, addable by clicking on a plus button, indivual criteria can be removed by clicking on a minus button</p>
    <p>criteria: input, two ends, # of divisions</p>
    <p>criteria: input</p>


    <p>sumit</p>

    <p>when the user submits, we have to show 10 urls that steve has decided to crawl</p>

    <div className='flex flex-col items-center justify-start h-screen'>
      if possible, urls sliding / appearing and with a loader icon, signifying that steve is crawling the url
      <p>10 urls</p>
      <p>url 1</p>
      <p>url 2</p>
      <p>url 3</p>
      <p>url 4</p>
      <p>url 5</p>
      <p>url 6</p>
      <p>url 7</p>
      <p>url 8</p>
    </div>






    </div>
  )
}

export default page