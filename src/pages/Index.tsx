import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { publications } from '@/data/publications';

const categoryGroups = {
  'Все': ['Статьи', 'Монографии', 'Учебники', 'Публицистика', 'Литература', 'Интервью'],
  'Научные': ['Статьи', 'Монографии', 'Учебники'],
  'Литература': ['Публицистика', 'Литература', 'Интервью']
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Все');

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pub.journal.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryGroups[selectedGroup as keyof typeof categoryGroups].includes(pub.category);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-6 py-8">
          <nav className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-semibold tracking-tight">Публикации</h1>
            <div className="flex items-center gap-6">
              {['Главная', 'Об авторе'].map((item) => (
                <button
                  key={item}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </nav>

          <div className="relative max-w-2xl">
            <Icon
              name="Search"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              type="search"
              placeholder="Поиск по публикациям, тегам, журналам..."
              className="pl-12 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="mb-16">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-semibold mb-6 leading-tight">
              Научные публикации и исследования
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Коллекция научных работ, статей и монографий, посвящённых вопросам
              философии, методологии и теории познания.
            </p>
          </div>
        </section>

        <Tabs defaultValue="Все" className="mb-12" onValueChange={setSelectedGroup}>
          <TabsList className="h-auto p-1 bg-secondary/50 flex-wrap justify-start">
            {Object.keys(categoryGroups).map((group) => (
              <TabsTrigger
                key={group}
                value={group}
                className="text-sm px-6 py-2.5"
              >
                {group}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(categoryGroups).map((group) => (
            <TabsContent key={group} value={group} className="mt-8">
              <div className="grid gap-6 animate-fade-in">
                {filteredPublications.length === 0 ? (
                  <div className="text-center py-16">
                    <Icon
                      name="FileSearch"
                      className="mx-auto mb-4 text-muted-foreground"
                      size={48}
                    />
                    <p className="text-lg text-muted-foreground">
                      Публикации не найдены
                    </p>
                  </div>
                ) : (
                  filteredPublications.map((pub, index) => (
                    <Card
                      key={pub.id}
                      className="group hover:shadow-lg transition-all duration-300 animate-scale-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardHeader className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <Badge variant="secondary" className="text-xs font-medium">
                              {pub.category}
                            </Badge>
                            <CardTitle className="text-2xl leading-tight group-hover:text-primary transition-colors">
                              {pub.title}
                            </CardTitle>
                          </div>
                          <span className="text-sm text-muted-foreground font-medium">
                            {pub.year}
                          </span>
                        </div>
                        <CardDescription className="text-sm text-muted-foreground italic">
                          {pub.journal}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-base leading-relaxed">{pub.excerpt}</p>
                        <div className="flex flex-wrap gap-2">
                          {pub.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Link to={`/publication/${pub.id}`}>
                          <Button
                            variant="ghost"
                            className="group/btn p-0 h-auto hover:bg-transparent"
                          >
                            <span className="text-primary flex items-center gap-2">
                              Читать полностью
                              <Icon
                                name="ArrowRight"
                                size={16}
                                className="group-hover/btn:translate-x-1 transition-transform"
                              />
                            </span>
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <section className="mt-20 pt-16 border-t border-border">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="BookOpen" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold">50+ публикаций</h3>
              <p className="text-muted-foreground">
                В ведущих научных журналах и издательствах
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Award" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Рецензирование</h3>
              <p className="text-muted-foreground">
                Все работы прошли строгую научную экспертизу
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="TrendingUp" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Индексация</h3>
              <p className="text-muted-foreground">
                Включены в международные научные базы данных
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Научные публикации. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;