new Tabs('tab1', {
  firstTabActive: true,
  isChanged(tabs) {
    console.log(tabs);
  },
})