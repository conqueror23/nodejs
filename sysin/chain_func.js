var obj = {
  n: 0,
  add: function() {
    this.n++
    return this;
  },
  decrease: function() {
    this.n--
    return this;
  },
  printn: function() {
    console.log(this.n)
  }
}
// obj.decrease();
// obj.add();
// obj.add();
// obj.add(); 
// obj.printn();//2 is the result

obj.decrease().add().add().add().printn();