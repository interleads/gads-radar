
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader
} from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Rocket, ChartBar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

const gradeBackgroundColor = {
  'A': 'bg-brand-green-500',
  'B': 'bg-brand-blue-500',
  'C': 'bg-brand-yellow-500',
  'D': 'bg-brand-red-500'
};

const ResultsCard: React.FC<ResultsCardProps> = ({ regionGrade, location, niche, keywordsData }) => {
  // Calculate total search volume
  const totalSearchVolume = keywordsData.reduce((sum, item) => sum + item.searchVolume, 0);
  
  return (
    <div className="animate-fade-in">
      <Card className="overflow-hidden bg-white border border-gray-200 shadow-md text-gray-800">
        <CardHeader className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Grade indicator */}
            <div className="md:w-1/4 p-6 flex items-center justify-center bg-gray-50">
              <div className={`
                w-24 h-24 rounded-full flex items-center justify-center 
                text-4xl font-bold text-white
                ${gradeBackgroundColor[regionGrade.grade]} 
                shadow-lg transition-transform hover:scale-105`}>
                {regionGrade.grade}
              </div>
            </div>
            
            {/* Header with message */}
            <div className="md:w-3/4 p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <h3 className="text-2xl font-bold mb-3">Análise de Concorrência</h3>
              <div className="mt-2 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  <p className="font-medium">
                    {regionGrade.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <ChartBar className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-xl text-gray-800">
                Total de buscas estimadas: <span className="text-blue-600 font-bold">{totalSearchVolume.toLocaleString()}</span>
              </h3>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow className="border-gray-200">
                    <TableHead className="text-gray-700 font-semibold">Palavra-chave</TableHead>
                    <TableHead className="text-right text-gray-700 font-semibold">Volume</TableHead>
                    <TableHead className="text-right text-gray-700 font-semibold">CPC médio (R$)</TableHead>
                    <TableHead className="text-right text-gray-700 font-semibold">Concorrência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keywordsData.map((keyword, index) => (
                    <TableRow key={index} className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-700">{keyword.keyword}</TableCell>
                      <TableCell className="text-right text-gray-700">{keyword.searchVolume.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-gray-700">R$ {keyword.cpc.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Badge className={`px-3 py-1 ${competitionColor[keyword.competition]}`}>
                          {keyword.competition}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsCard;
