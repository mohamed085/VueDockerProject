<template>
  <div class="body">
    <section class="jp-404">
      <h1>
        <span> 404 </span>
        عذرا، لم يتم العثور على الصفحة!
      </h1>
      <p>
        الصفحة التي تبحث عنها غير موجودة. ربما تمت إزالته أو تم تغيير عنوان URL الخاص به.
      </p>
      <router-link to="/" class="back-to-home"><i class="fa fa-home"></i> العودة للصفحة الرئيسية </router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>
@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
@import "https://fonts.googleapis.com/css?family=Assistant";
*{
  margin: 0;
  padding:0
}

.body {
  margin-top: -20px;
  min-height: 100vh;
  font-family: 'Assistant', sans-serif;
  background: #ED213A;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #198754, #3DA575);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #198754, #3DA575); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.jp-404,
.jp-404 p{
  user-select: none;
  -webkit-user-select: none;
  color: #fff;
}

.jp-404 p{
  padding: 10px;
  margin: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.85);
}
.jp-404 h1 {
  text-align: center;

}
.jp-404 h1 span {
  display: block;
  margin: 20px auto;
  font-size: 120px;
}

a.back-to-home {
  border: 2px solid #fff;
  -webkit-tap-highlight-color: transparent;
  max-width: 250px;
  text-align: center;
  border-radius: 10px;
  padding: 16px;
  display: block;
  margin: 25px auto;
  color: #fff;
  text-decoration: none;
  transition: .4s;
  font-size: 16px;
  -webkit-transition: .4s;
}

a.back-to-home:hover{
  background: #fff;
  color:  #198754;
  transition: .4s;
  -webkit-transition: .4s;
}
.copy-404 {
  margin: 25px;
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
}
.copy-404 a{
  text-decoration: none;
  color: rgba(255, 255, 255, 0.65);
}
.copy-404 a:hover{
  text-decoration: underline;
  color: #fff;
}
</style>