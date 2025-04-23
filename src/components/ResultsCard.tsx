
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

export interface KeywordData {
  keyword: string;
  searchVolume: number;
  competition: 'Baixa' | 'Média' | 'Alta';
  cpc: number;
}

interface RegionGradeProps {
  grade: 'A' | 'B' | 'C' | 'D';
  message: string;
}

interface ResultsCardProps {
  regionGrade: RegionGradeProps;
  location: string;
  niche: string;
  keywordsData: KeywordData[];
}

const gradeMessages = {
  'A': 'Excelente oportunidade de anúncios!',
  'B': 'Boa oportunidade de anúncios',
  'C': 'Oportunidade moderada de anúncios',
  'D': 'Oportunidade limitada de anúncios'
};

const competitionColor = {
  'Baixa': 'text-brand-green',
  'Média': 'text-brand-yellow',
  'Alta': 'text-brand-red'
};

const ResultsCard: React.FC<ResultsCardProps> = ({ regionGrade, location, niche, keywordsData }) => {
  // Prep data for the chart
  const chartData = keywordsData.map(item => ({
    name: item.keyword.length > 15 ? item.keyword.substring(0, 15) + '...' : item.keyword,
    volume: item.searchVolume,
    cpc: item.cpc
  }));

  return (
    <div className="animate-fade-in">
      <Card className="shadow-lg border-t-4 border-t-brand-blue-500">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">Análise de Concorrência</CardTitle>
              <CardDescription className="mt-1">
                Resultados para {niche} na região do CEP: {location}
              </CardDescription>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold grade-${regionGrade.grade.toLowerCase()}`}>
                {regionGrade.grade}
              </div>
              <span className="text-sm font-medium mt-1">Nota da região</span>
            </div>
          </div>
          
          <div className="bg-brand-gray-50 border border-brand-gray-100 rounded-lg p-4 mt-4">
            <p className="font-medium text-lg">{regionGrade.message || gradeMessages[regionGrade.grade]}</p>
            <p className="text-sm text-gray-600 mt-1">
              Esta análise é baseada em dados atuais do Google Ads para sua região e nicho.
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <h3 className="font-semibold text-lg mb-3">Palavras-chave principais</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Palavra-chave</TableHead>
                  <TableHead className="text-right">Volume de busca</TableHead>
                  <TableHead className="text-right">CPC médio (R$)</TableHead>
                  <TableHead className="text-right">Concorrência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywordsData.map((keyword, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{keyword.keyword}</TableCell>
                    <TableCell className="text-right">{keyword.searchVolume.toLocaleString()}</TableCell>
                    <TableCell className="text-right">R$ {keyword.cpc.toFixed(2)}</TableCell>
                    <TableCell className={`text-right ${competitionColor[keyword.competition]}`}>
                      {keyword.competition}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <h3 className="font-semibold text-lg mt-8 mb-3">Visualização de oportunidades</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === 'volume') return [value.toLocaleString(), 'Volume de busca'];
                    if (name === 'cpc') return [`R$ ${value.toFixed(2)}`, 'CPC médio'];
                    return [value, name];
                  }}
                />
                <Bar yAxisId="left" dataKey="volume" name="Volume de busca" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="cpc" name="CPC médio (R$)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        
        <CardFooter>
          <p className="text-sm text-gray-500">
            Dados atualizados em {new Date().toLocaleDateString()}. Fonte: Google Ads API.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultsCard;
