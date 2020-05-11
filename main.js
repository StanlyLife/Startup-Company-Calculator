let MyComponents;
let MyFeatures;

async function getFeatures() {
  await fetch("features.json")
    .then((x) => x.json())
    .then((requirements) => {
      MyFeatures = requirements;
      // CreateFeatureRequirements(requirements.Sharing_Functionality, "Sf");
      // CreateFeatureRequirements(requirements.Chat_System, "Chat System");
      // CreateFeatureRequirements(requirements.Live_Streaming, "Live Streaming");
      CreateFeatureRequirements(requirements.Landing_Page, "Landing page");
      CreateFeatureRequirements(requirements.Video_Functionality, "Video F");
    });
}

async function GetComponents() {
  await fetch("components.json")
    .then((x) => x.json())
    .then((components) => {
      MyComponents = components;
      LogComponents(components.Backend_Component, "UI Component");
      CreateElement(components.Backend_Module);
      GetRequirements(components.Backend_Module);
    });
}

async function LogComponents(compontent, compontentName) {}

function CreateElement(component) {
  let container = document.createElement("div");
  container.classList.add("element-container");

  let MainComponent = document.createElement("div");
  MainComponent.classList.add("main-component");
  MainComponent.innerText = component.name;

  container.appendChild(MainComponent);

  component.requirements.forEach((element) => {
    let RequiredComponent = document.createElement("div");
    RequiredComponent.innerText = `Required: ${element.amount} : ${element.name}`;
    container.appendChild(RequiredComponent);
  });

  document.querySelector("main").appendChild(container);
}

function GetRequirements(component) {
  const list = [];
  component.requirements.forEach((r) => {
    for (let i = 0; i < r.amount; i++) {
      list.push(r.name);
    }
  });
  return list;
}

function GetFeatureRequirements() {
  MyFeatures.Landing_Page.forEach((component) => {});
}

let requirementsList = [];
let requirementsAmount = [];

function ComponentRequirements(_component, amount) {
  /* parse from feature.component to components.component */
  component = MyComponents[_component.name];
  for (var i = 0; i < amount; i++) {
    requirementsList.push(component.name);
  }
  /* Check if component has requirements */
  if (ComponentHasRequirements(component.requirements)) {
    component.requirements.forEach((requirement) => {
      if (amount > 1) {
        ComponentRequirements(requirement, requirement.amount * amount);
      } else {
        ComponentRequirements(requirement, requirement.amount);
      }
    });
  } else {
    console.log(`${component.name} has no requirements`);
  }
}

function ComponentHasRequirements(requirements) {
  if (requirements.length > 0) {
    return true;
  }
  return false;
}
let counts = {};
function CreateFeatureRequirements(feature, name) {
  requirementsList = [];
  feature.forEach((Requirements) => {
    requirementsAmount = [];
    requirementsList.push(Requirements.name);
    ComponentRequirements(
      MyComponents[Requirements.name],
      MyComponents[Requirements.name].amount
    );
    requirementsList.sort();

    /* */
    /* */
  });
  counts = {};
  requirementsList.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  console.log(counts);
  CreateFeatureHtml(name);
}

function CreateFeatureHtml(name) {
  const featureContainer = document.createElement("div");
  featureContainer.classList.add("feature");

  featureHeader = document.createElement("h1");
  featureHeader.innerText = name;
  featureContainer.appendChild(featureHeader);

  const componentContainer = document.createElement("div");
  // counts.forEach((com) => {
  //   let component = document.createElement("p");
  //   component.innerText = `component ${com}`;
  //   componentContainer.appendChild(component);
  // });

  var propValue;
  for (var propName in counts) {
    propValue = counts[propName];
    let component = document.createElement("p");
    component.innerText = `${propValue} : ${propName}`;
    componentContainer.appendChild(component);
  }

  featureContainer.appendChild(componentContainer);
  document.querySelector("main").appendChild(featureContainer);
}

GetComponents();
getFeatures();
