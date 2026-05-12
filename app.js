import RecipeCard from './components/RecipeCard.js';

const { createApp, ref, computed, watch } = Vue;

createApp({
  components: {
    RecipeCard
  },
  setup() {
    // ----- Реактивні дані -----
const recipes = ref([
  { id:1, title:'Борщ український', description:'Традиційний червоний борщ з буряком та капустою', cookTime:90, difficulty:'середня', image:'https://images.unian.net/photos/2020_04/1588081977-7108.jpg?0.533115173094685', ingredients:['буряк','капуста','картопля','морква','цибуля','томатна паста'] },
  { id:2, title:'Паста Карбонара', description:'Італійська паста з беконом, яйцями та пармезаном', cookTime:25, difficulty:'легка', image:'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=300&t=20260427', ingredients:['спагеті','бекон','яйця','пармезан'] },
  { id:3, title:'Цезар з куркою', description:'Свіжий салат з куркою та соусом Цезар', cookTime:20, difficulty:'легка', image:'https://images.pexels.com/photos/2294164/pexels-photo-2294164.jpeg?w=300&t=20260427', ingredients:['куряче філе','салат романо','пармезан','соус цезар'] },
  { id:4, title:'Тірамісу', description:'Ніжний десерт з маскарпоне та кавою', cookTime:40, difficulty:'складна', image:'https://images.pexels.com/photos/812131/pexels-photo-812131.jpeg?w=300&t=20260427', ingredients:['маскарпоне','кава','печиво савоярді','яйця','какао'] },
  { id:5, title:'Грецький салат', description:'Салат з фетою та оливками', cookTime:10, difficulty:'легка', image:'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?w=300&t=20260427', ingredients:['помідори','огірок','цибуля','фета','оливки'] },
  { id:6, title:'Курячий суп', description:'Домашній суп з локшиною', cookTime:60, difficulty:'середня', image:'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?w=300&t=20260427', ingredients:['курка','морква','локшина','кріп'] }
])

    const searchText = ref('');
    const maxTime = ref(120);
    const selectedRecipe = ref(null);

    // ----- COMPUTED: фільтрація за текстом і часом -----
    const filteredRecipes = computed(() => {
      let result = recipes.value;
      if (searchText.value.trim()) {
        const lowerQuery = searchText.value.toLowerCase();
        result = result.filter(recipe =>
          recipe.title.toLowerCase().includes(lowerQuery)
        );
      }
      result = result.filter(recipe => recipe.cookTime <= maxTime.value);
      return result;
    });

    // ----- WATCH: логування при зміні фільтрів (для демонстрації) -----
    watch(searchText, (newVal, oldVal) => {
      console.log(`🔎 Пошук змінено: "${oldVal}" → "${newVal}"`);
    });
    
    watch(maxTime, (newVal) => {
      console.log(`⏱ Фільтр за часом: макс. ${newVal} хв`);
    });

    // ----- METHODS -----
    function handleViewDetails(recipeId) {
      const recipe = recipes.value.find(r => r.id === recipeId);
      if (recipe) {
        selectedRecipe.value = recipe;
      }
    }
    
    function closeModal() {
      selectedRecipe.value = null;
    }

    // Повертаємо все для шаблону
    return {
      recipes,
      searchText,
      maxTime,
      filteredRecipes,
      selectedRecipe,
      handleViewDetails,
      closeModal
    };
  }
}).mount('#app');