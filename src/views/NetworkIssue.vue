<template>
  <div>
    <h1>Uh-Oh!!</h1>
    <h3>
      It looks like you're experiencing some network issues, please click back
      button to try again!!
    </h3>
    <router-link :to="{ name: 'event-list' }"
      >Back to the Home Page</router-link
    >
  </div>
</template>
