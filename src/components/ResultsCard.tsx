
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
import { Medal, Search, DollarSign, Flame, LightbulbIcon } from 'lucide-react';

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

const competitionColor = {
  'Baixa': 'text-brand-green-500',
  'Média': 'text-brand-yellow-500',
  'Alta': 'text-brand-red-500'
};

const competitionBg = {
  'Baixa': 'bg-brand-green-50',
  'Média': 'bg-brand-yellow-50',
  'Alta': 'bg-brand-red-50'
};

const ResultsCard: React.FC<ResultsCardProps> = ({ regionGrade, location, niche, keywordsData }) => {
  const chartData = keywordsData.map(item => ({
    name: item.keyword.length > 15 ? item.keyword.substring(0, 15) + '...' : item.keyword,
    volume: item.searchVolume,
    cpc: item.cpc
  }));

  return (
    <div className="animate-fade-in">
      <Card className="shadow-xl border-t-4 border-t-brand-blue-500">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-brand-blue-600 to-brand-blue-400 bg-clip-text text-transparent">
                Análise de Concorrência
              </CardTitle>
              <CardDescription className="mt-1">
                Resultados para {niche} na região do CEP: {location}
              </CardDescription>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 transform hover:scale-110 grade-${regionGrade.grade.toLowerCase()} shadow-lg`}>
                <Medal className="absolute opacity-10 w-12 h-12" />
                {regionGrade.grade}
              </div>
              <span className="text-sm font-medium mt-2">Nota da região</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-brand-blue-50 to-brand-green-50 border border-brand-blue-100 rounded-lg p-6 mt-6">
            <div className="flex gap-3 items-center">
              <LightbulbIcon className="w-8 h-8 text-brand-blue-400" />
              <p className="font-medium text-lg text-brand-blue-700">
                {regionGrade.message}
              </p>
            </div>
            <p className="text-sm text-brand-blue-600/80 mt-2">
              Esta análise é baseada em dados atuais do Google Ads para sua região e nicho.
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <h3 className="font-semibold text-xl mb-4 text-brand-blue-800">
            Palavras-chave principais
          </h3>
          
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Palavra-chave
                    </div>
                  </TableHead>
                  <TableHead className="text-right font-semibold">
                    <div className="flex items-center gap-2 justify-end">
                      <Search className="w-4 h-4" />
                      Volume de busca
                    </div>
                  </TableHead>
                  <TableHead className="text-right font-semibold">
                    <div className="flex items-center gap-2 justify-end">
                      <DollarSign className="w-4 h-4" />
                      CPC médio
                    </div>
                  </TableHead>
                  <TableHead className="text-right font-semibold">
                    <div className="flex items-center gap-2 justify-end">
                      <Flame className="w-4 h-4" />
                      Concorrência
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywordsData.map((keyword, index) => (
                  <TableRow key={index} className={`${competitionBg[keyword.competition]} transition-colors`}>
                    <TableCell className="font-medium">{keyword.keyword}</TableCell>
                    <TableCell className="text-right">{keyword.searchVolume.toLocaleString()}</TableCell>
                    <TableCell className="text-right">R$ {keyword.cpc.toFixed(2)}</TableCell>
                    <TableCell className={`text-right font-medium ${competitionColor[keyword.competition]}`}>
                      {keyword.competition}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <h3 className="font-semibold text-xl mt-8 mb-4 text-brand-blue-800">
            Visualização de oportunidades
          </h3>
          <div className="h-72 p-4 border border-gray-100 rounded-lg bg-gradient-to-b from-white to-gray-50">
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fill: '#4B5563', fontSize: 12 }}
                />
                <YAxis yAxisId="left" orientation="left" stroke="#6366F1" />
                <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === 'volume') return [value.toLocaleString(), 'Volume de busca'];
                    if (name === 'cpc') return [`R$ ${value.toFixed(2)}`, 'CPC médio'];
                    return [value, name];
                  }}
                />
                <Bar yAxisId="left" dataKey="volume" name="Volume de busca" fill="#6366F1" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="cpc" name="CPC médio (R$)" fill="#10B981" radius={[4, 4, 0, 0]} />
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
