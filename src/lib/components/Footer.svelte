<script>
  let date = new Date("June 28, 2024, 7:00 PM EST").getTime();
  var now = new Date().getTime();
</script>

{#if now > date}
  <div class="flex flex-col w-full items-center p-2">
    <h5 class="h5">Thank You For Joining Us!</h5>
  </div>
{/if}
