<script setup>
import { getDay } from 'date-fns';
import {onMounted} from "vue";
const props =defineProps({
  cols:{
    type:Array,
    default:1,
    required:true
  },
  data:{
    type:Array,
  }
})

const formatHour = (n) => {
  if (n < 10) {
    return `0${n}:00`
  }
  return `${n}:00`
}

const handleClick = (e,i,n) =>{
  console.log(e.target)
  console.log(n)
  console.log(i)

}

onMounted(()=>{

})

</script>

<template>
<div class="container">
  <table>
    <thead>
      <tr>
        <th scope="col"></th>
        <th v-for="(col,i) in cols" scope="col">{{ col }}</th>
      </tr>
      <tr>
        <th scope="col"></th>
        <th v-for="(col,i) in cols" scope="col">{{  }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="n in 23" :key="n">
        <td>{{formatHour(n)}}</td>
        <td v-for="(col,i) in cols">
          <div class="clickable" @click="(e)=> handleClick(e,i,n)">

          </div>
        </td>
      </tr>
    </tbody>

  </table>
</div>

</template>

<style scoped>

table{
  border-collapse: collapse;
}
tr, th{
  min-width: 5vw;
  border: 1px solid #a9e8ae;
}
td, th{
  border: 1px solid #a9e8ae;
  padding: 0.25rem;
  position:relative;
}
td:hover{
  background-color:#9ebaa0;
}

.clickable{
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
}


</style>