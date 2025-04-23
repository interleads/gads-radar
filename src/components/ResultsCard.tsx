
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader
} from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Rocket } from 'lucide-react';

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
  'Baixa': 'bg-brand-green-400 text-white',
  'Média': 'bg-brand-yellow-400 text-white',
  'Alta': 'bg-brand-red-400 text-white'
};

const ResultsCard: React.FC<ResultsCardProps> = ({ regionGrade, location, niche, keywordsData }) => {
  const chartData = keywordsData.map(item => ({
    name: item.keyword.length > 15 ? item.keyword.substring(0, 15) + '...' : item.keyword,
    volume: item.searchVolume,
    cpc: item.cpc
  }));

  return (
    <div className="animate-fade-in">
      <Card className="overflow-hidden bg-gradient-to-br from-[#1a1040] to-[#120a2e] border-none text-white shadow-2xl">
        <CardHeader className="p-0">
          <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-[#1e1148] to-[#2a0e4a]">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold grade-${regionGrade.grade.toLowerCase()} shadow-lg transition-transform hover:scale-105`}>
              {regionGrade.grade}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Análise de Concorrência</h3>
              <div className="mt-2 bg-gradient-to-r from-[#ff3366] to-[#ff6b6b] p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <Rocket className="w-6 h-6" />
                  <p className="font-medium text-lg">
                    {regionGrade.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-xl mb-4">
                Palavras-chave principais
              </h3>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-white/10">
                      <TableHead className="text-white/90">Palavra-chave</TableHead>
                      <TableHead className="text-right text-white/90">Volume</TableHead>
                      <TableHead className="text-right text-white/90">CPC (R$)</TableHead>
                      <TableHead className="text-right text-white/90">Concorrência</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keywordsData.map((keyword, index) => (
                      <TableRow key={index} className="border-white/10">
                        <TableCell className="font-medium text-white/90">{keyword.keyword}</TableCell>
                        <TableCell className="text-right text-white/90">{keyword.searchVolume.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-white/90">R$ {keyword.cpc.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm ${competitionColor[keyword.competition]}`}>
                            {keyword.competition}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-4">
                Visualização de oportunidades
              </h3>
              <div className="h-72 rounded-xl bg-white/5 p-4 border border-white/10">
                <ResponsiveContainer>
                  <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis 
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      tick={{ fill: '#fff', fontSize: 12 }}
                      stroke="rgba(255,255,255,0.3)"
                    />
                    <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: '#fff' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1040', border: '1px solid rgba(255,255,255,0.1)' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="volume" name="Volume de busca" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsCard;
