export default {
  name: 'RecipeCard',
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    cookTime: {
      type: Number,
      required: true
    },
    difficulty: {
      type: String,
      validator(value) {
        return ['легка', 'середня', 'складна'].includes(value);
      }
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300x180?text=Recipe'
    }
  },
  computed: {
    // Обчислювана властивість для динамічного класу за рівнем складності
    difficultyClass() {
      const map = {
        'легка': 'difficulty-easy',
        'середня': 'difficulty-medium',
        'складна': 'difficulty-hard'
      };
      return map[this.difficulty] || '';
    }
  },
  methods: {
    emitViewDetails() {
      this.$emit('view-details', this.id);
    }
  },
  template: `
    <div class="recipe-card" @click="emitViewDetails">
      <img :src="image" :alt="title">
      <div class="card-content">
        <h3>{{ title }}</h3>
        <div class="cook-time">⏱ {{ cookTime }} хв</div>
        <div class="difficulty" :class="difficultyClass">
          🧑‍🍳 Складність: {{ difficulty }}
        </div>
        <p class="description">{{ description.substring(0, 80) }}...</p>
      </div>
    </div>
  `
};