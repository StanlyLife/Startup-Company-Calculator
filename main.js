let MyComponents;
let MyFeatures;
const featureSelect = document.querySelector("#functioanlities");
const featureBtn = document.querySelector("#add-feature-btn");
const addedFeaturesCounter = document.querySelector("#added-features");
const addedFeaturesWrapper = document.querySelector(".added-features-wrapper");

/* fetch json */
async function getFeatures() {
  await fetch("features.json")
    .then((x) => x.json())
    .then((requirements) => {
      MyFeatures = requirements;
      createSelectorOptions();
    });
}

async function GetComponents() {
  await fetch("components.json")
    .then((x) => x.json())
    .then((components) => {
      MyComponents = components;
      return components;
    });
}

/* Event listeners */
featureBtn.addEventListener("click", (x) => {
  console.log(featureSelect.value);
  CreateFeatureRequirements(
    MyFeatures[featureSelect.value],
    featureSelect.value
  );
});

/* Create options for select dropdown */
function createSelectorOptions() {
  const keys = Object.keys(MyFeatures);

  keys.forEach((feature) => {
    let opt = document.createElement("Option");
    let newOptionName = String(feature).replace(/_/g, " ");
    opt.innerText = newOptionName;
    opt.value = feature;
    featureSelect.appendChild(opt);
  });
}

let requirementsList = [];
/* Recursive method to get the sub(*n)requirements */
function ComponentRequirements(_component, amount) {
  /* parse from feature.component to components.component */
  component = MyComponents[_component.name];
  try {
    console.log(`trying to push ${component.name}`);
  } catch (error) {
    console.log(`Could not create variable ${_component.name}`);
  }
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
  }
}
/* check if component has requirements */
function ComponentHasRequirements(requirements) {
  if (requirements.length > 0) {
    return true;
  }
  return false;
}
/* create an object of requirements for the feature */
let counts = {};
function CreateFeatureRequirements(feature, name) {
  requirementsList = [];
  feature.forEach((Requirements) => {
    for (let i = 0; i < Requirements.amount; i++) {
      ComponentRequirements(MyComponents[Requirements.name], 1);
    }
    requirementsList.sort();
  });
  counts = {};
  requirementsList.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  CreateFeatureHtml(name);
}

/* create feature html division */
function CreateFeatureHtml(name) {
  const featureContainer = document.createElement("div");
  featureContainer.classList.add("feature");

  featureHeader = document.createElement("h1");
  featureHeader.innerText = String(name).replace(/_/g, " ");
  featureContainer.appendChild(featureHeader);

  const componentContainer = document.createElement("div");

  /* add feature to counter */
  AddFeatureCounter(name);

  var propValue;
  for (var propName in counts) {
    let componentWrapper = document.createElement("div");
    componentWrapper.classList.add("component-wrapper");
    /* add image */
    if (MyComponents[propName].url != undefined) {
      let componentImage = document.createElement("img");
      componentImage.src = `${MyComponents[propName].url}`;
      componentWrapper.appendChild(componentImage);
    }
    propValue = counts[propName];
    AddComponentToProductionTable(MyComponents[propName], parseInt(propValue));
    let component = document.createElement("p");
    let componentAmount = document.createElement("p");
    componentAmount.classList.add("amount");

    let newpropName = String(propName).replace(/_/g, " ");

    componentAmount.innerText = `${propValue}`;
    component.innerText = `${newpropName}`;
    componentWrapper.appendChild(componentAmount);
    componentWrapper.appendChild(component);
    componentContainer.appendChild(componentWrapper);
  }

  featureContainer.appendChild(componentContainer);
  document.querySelector("main").appendChild(featureContainer);
}

function AddTimeToProductionTable(component, amount) {
  let timeId;
  switch (String(component.role)) {
    case "developer":
      timeId = "developer-time";
      break;
    case "designer":
      timeId = "designer-time";
      break;
    case "Lead_Developer":
      timeId = "Lead-Developer-time";
      break;
    case "Sysadmin":
      timeId = "Sysadmin-time";
      break;
    case "other":
      timeId = "other-time";
      break;
    default:
      console.log(`error for : ${component.role}`);
      break;
  }

  const timer = document.querySelector(`.${timeId}`);
  timer.innerText = parseInt(timer.innerText) + component.time * amount;
}

function AddComponentToProductionTable(component, amount) {
  let td = document.querySelector(`.${component.role}`);

  let ProductionComponent = document.getElementById(`${component.name}`);
  if (ProductionComponent === null) {
    /* create component container */
    let NewProductionComponent = document.createElement("div");
    NewProductionComponent.classList.add("table-component");
    NewProductionComponent.classList.add(`${component.name}`);
    NewProductionComponent.value = String(component.name).replace(/_/g, " ");

    /* image */
    let componentImage = document.createElement("img");
    componentImage.src = `${component.url}`;
    NewProductionComponent.appendChild(componentImage);
    /* amount */
    let componentAmount = document.createElement("p");
    componentAmount.innerText = amount;
    componentAmount.id = component.name;
    NewProductionComponent.appendChild(componentAmount);

    /* append to table */
    td.appendChild(NewProductionComponent);

    /* add tool tip */
    tippy(`.${component.name}`, {
      content: `${String(component.name).replace(/_/g, " ")} : ${
        component.time
      } Hours`,
      duration: 500,
      trigger: "click",
      theme: "tooltip",
    });
  } else {
    /* append amount */
    ProductionComponent.innerText =
      parseInt(ProductionComponent.innerText) + amount;
  }
  AddTimeToProductionTable(component, amount);
}

/* this is the top level div with feature- name & amount */
function AddFeatureCounter(featureName) {
  let featureBlock = document.querySelector(`.${featureName}`);
  if (featureBlock === null || featureBlock === undefined) {
    /* create div */
    featureBlock = document.createElement("div");
    featureBlock.classList.add(featureName);
    featureBlock.id = "added-features";
    /* create name */
    const featureBlockName = document.createElement("p");
    featureBlockName.classList.add("name");
    featureBlockName.innerText = String(featureName).replace(/_/g, " ");

    /* feature amount */
    const featureBlockAmount = document.createElement("p");
    featureBlockAmount.classList.add("amount");
    featureBlockAmount.innerText = 1;

    /*append children */
    featureBlock.appendChild(featureBlockName);
    featureBlock.appendChild(featureBlockAmount);
    /* append to wrapper */
    addedFeaturesWrapper.appendChild(featureBlock);
  } else {
    let amount = featureBlock.querySelector(".amount");
    amount.innerText = parseInt(amount.innerText) + 1;
  }
}

/* tooltips */
tippy(".time", {
  content: `Time to produce`,
  theme: "time-tooltip",
});

GetComponents();
getFeatures();
