<template>
  <div class="cart">
    <div class="container">
      <ul>
        <li v-for="(i, idx) in state.items" :key="idx">
          <img :src="i.imgPath"/>
          <span class="name">{{ i.name }}</span>
          <span class="price">{{ lib.getNumberFormatted(i.price * (1 - i.discountPer / 100)) }}원</span>
          <i class="fa fa-trash" @click="removeItem(i.id)"></i>
        </li>
      </ul>
      <router-link to="/order" class="btn btn-primary">구입하기</router-link>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import lib from "@/scripts/lib";


export default {
  setup() {
    const state = reactive({
      items: []
    })

    const load = () => {
      axios.get("/api/cart/items").then(({data}) => {
        console.log('data : ', data);
        state.items = data;
      })
    }

    // 내가 만든 것처럼 back에서 delete를 할 때 바로 데이터를 재조회하여 넘겨주는 것이 나을 것인가?
    // 아니면 강의처럼 .then 에서 load()를 실행하는 것이 나을 것인가?
    // 어떤 관점에서 판단해야 할까?
    const removeItem = (itemId) => {
      axios.delete(`/api/cart/items/${itemId}`).then(({data}) => {
        console.log('remove success');
        state.items = data;
      })
    }

    load();

    return {state, lib, removeItem}
  }

}
</script>

<style scoped>

.cart ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cart ul li {
  border: 1px solid #eee;
  margin-top: 25px;
  margin-bottom: 25px;
}

.cart ul li img {
  width: 200px;
  height: 200px;
}

.cart ul li .name {
  margin-left: 25px;
}

.cart ul li .price {
  margin-left: 25px;
}

.cart ul li i {
  float: right;
  font-size: 25px;
  margin-top: 90px;
  margin-right: 50px;
}

.cart .btn {
  width: 200px;
  height: 50px;
  display: block;
  margin: 0 auto;
  text-align: center;
  line-height: 35px;
}

</style>
