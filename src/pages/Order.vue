<template>
  <div class="order">
    <div class="container">
      <div>
        <div class="py-5 text-center"><h2>주문하기</h2></div>
        <div class="row g-5">
          <div class="col-md-5 col-lg-4 order-md-last"><h4
              class="d-flex justify-content-between align-items-center mb-3"><span
              class="text-primary">주문 목록</span><span
              class="badge bg-primary rounded-pill">{{ state.items.length }}</span></h4>
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between lh-sm" v-for="(i, idx) in state.items"
                  :key="idx">
                <div>
                  <h6 class="my-0">
                    {{ i.name }}
                  </h6>
                  <small class="text-body-secondary">
                    -{{ i.discountPer }}%
                  </small>
                </div>
                <span class="text-muted">
                  {{ lib.getNumberFormatted(i.price * (1 - i.discountPer / 100)) }}원
                </span>
              </li>
            </ul>
            <h3 class="text-center total-price">
              {{ lib.getNumberFormatted(computedPrice) }}원
            </h3>
          </div>
          <div class="col-md-7 col-lg-8"><h4 class="mb-3">주문자 정보</h4>
            <form class="needs-validation" novalidate="">
              <div class="row g-3">
                <div class="col-12"><label for="username" class="form-label">이름</label>
                  <div class="input-group has-validation">
                    <input type="text"
                           class="form-control"
                           id="username"
                           required=""
                           v-model="state.form.name">
                  </div>
                </div>
                <div class="col-12"><label for="address" class="form-label">주소</label>
                  <input type="text"
                         class="form-control"
                         id="address"
                         required=""
                         v-model="state.form.address">
                </div>
              </div>
              <hr class="my-4">
              <h4 class="mb-3">결제 수단</h4>
              <div class="my-3">
                <div class="form-check">
                  <input id="card" name="paymentMethod" type="radio" class="form-check-input"
                         value="card"
                         v-model="state.form.payment">
                  <label class="form-check-label" for="card">
                    신용카드
                  </label>
                </div>
                <div class="form-check">
                  <input id="bank" name="paymentMethod" type="radio" class="form-check-input"
                         value="bank"
                         v-model="state.form.payment">
                  <label class="form-check-label" for="bank">
                    무통장입금
                  </label>
                </div>
              </div>
              <div class="row gy-3">
                <div class="col-md-12"><label for="cc-number" class="form-label">Credit card number</label>
                  <input
                      type="text" class="form-control" id="cc-number"
                      v-model="state.form.cardNumber">
                </div>
              </div>
              <hr class="my-4">
              <button class="w-100 btn btn-primary btn-lg" @click="submit()">결제하기</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, reactive} from "vue";
import axios from "axios";
import lib from "@/scripts/lib";
import router from "@/scripts/router";


export default {
  setup() {
    const state = reactive({
      items: [],
      form: {
        name: "",
        address: "",
        payment: "",
        cardNumber: "",
        items: "",
      }
    })

    const load = () => {
      axios.get("/api/cart/items").then(({data}) => {
        console.log('data : ', data);
        state.items = data;
      })
    }

    const computedPrice = computed(() => {
      let result = 0;

      for (let i of state.items) {
        result += i.price * (1 - i.discountPer / 100);
      }

      return result;
    })

    const submit = () => {
      const args = JSON.parse(JSON.stringify(state.form));
      args.items = JSON.stringify(state.items);

      axios.post("/api/orders", args).then(() => {
        console.log('purchase success');
        alert("주문 완료하였습니다!");
        router.push("/orders");
      })
    }

    load();

    return {state, lib, computedPrice, submit}
  }

}
</script>

<style scoped>


</style>
