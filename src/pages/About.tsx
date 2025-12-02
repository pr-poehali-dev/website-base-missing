import Header from '@/components/Header';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/3">
              <img 
                src="https://cdn.poehali.dev/files/69f312af-64e7-4a9f-be19-0b2e6d3ee7be.jpg" 
                alt="Алексей Каплан"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">Алексей Каплан</h1>
              <p className="text-lg text-muted-foreground mb-4">
                Писатель, публицист, исследователь
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Биография</h2>
              <p className="text-muted-foreground mb-4">
                Алексей Каплан — современный российский писатель, публицист и исследователь. 
                Его работы охватывают широкий спектр тем, от научных статей до художественной прозы.
              </p>
              <p className="text-muted-foreground mb-4">
                В своих произведениях автор исследует актуальные вопросы современности, 
                сочетая глубокий анализ с доступным изложением.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Образование и научная деятельность</h2>
              <p className="text-muted-foreground mb-4">
                Автор активно занимается научной деятельностью, публикует статьи, 
                монографии и учебные пособия по различным направлениям.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Литературное творчество</h2>
              <p className="text-muted-foreground mb-4">
                Помимо научных работ, Алексей Каплан занимается художественной литературой, 
                создавая произведения, которые находят отклик у широкой аудитории читателей.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Контакты</h2>
              <p className="text-muted-foreground">
                Для связи с автором и по вопросам сотрудничества используйте контактную информацию, 
                указанную на сайте.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
