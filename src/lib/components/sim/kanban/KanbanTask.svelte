<script>
  export let name = "";
  export let description = "";
</script>

<div
  class="cursor-pointer rounded-lg bg-white p-2 shadow-sm hover:scale-105 hover:transform hover:transition-transform hover:duration-200"
>
  <h3 class="text-lg font-semibold">{name}</h3>
  <p class="text-gray-600">{description}</p>
</div>
