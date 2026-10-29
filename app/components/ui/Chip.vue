<template>
  <span class="chip"><slot /></span>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 11px;
  border-radius: 999px;
  background: var(--color-bg);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-muted);
}
</style>
