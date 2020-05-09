let MyComponents;
async function GetComponents() {
  await fetch("components.json")
    .then((x) => x.json())
    .then((components) => {
      console.log(components);
      MyComponents = components;
      LogComponents(components.UI_Component, "UI Component");
    });
}

async function LogComponents(compontent, compontentName) {
  console.log(`${compontentName}`);
  console.log(`Component role ${compontent.role}`);
  console.log(`Component time ${compontent.time}`);
  console.log(`Component requirements ${compontent.requirements}`);
}
GetComponents();
