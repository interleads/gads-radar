
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader
} from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Rocket } from 'lucide-react';
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
      <Card className="overflow-hidden bg-white border border-gray-200 shadow-lg">
        {/* Enhanced Card Header with stronger shadow and border to separate from content */}
        <CardHeader className="p-0 shadow-md border-b border-gray-200">
          <div className="flex flex-col md:flex-row">
            {/* Grade indicator with enhanced shadow */}
            <div className="md:w-1/4 p-6 flex items-center justify-center bg-gray-50">
              <div className={`
                w-24 h-24 rounded-full flex items-center justify-center 
                text-[5rem] font-bold text-white
                ${gradeBackgroundColor[regionGrade.grade]} 
                shadow-xl`}>
                {regionGrade.grade}
              </div>
            </div>
            
            {/* Search volume and message with enhanced contrast */}
            <div className="md:w-3/4 flex flex-col">
              <div className="bg-white p-6">
                <h2 className="text-4xl font-bold text-gray-800">
                  {totalSearchVolume.toLocaleString()} buscas
                </h2>
              </div>
              <div className="bg-teal-500 p-4 text-white">
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  <p className="font-medium text-lg">
                    Alto potencial de lucratividade em anúncios no Google
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Palavras-chave principais</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 border-b-2 border-gray-300">
                  <TableHead className="text-gray-700 font-medium">Palavra-chave</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium">Volume de busca</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium">CPC médio (R$)</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium">Concorrência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywordsData.map((keyword, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell className="font-medium text-gray-700">{keyword.keyword}</TableCell>
                    <TableCell className="text-right text-gray-700">{keyword.searchVolume.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-gray-700">{keyword.cpc.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={`px-3 py-1 ${competitionColor[keyword.competition]}`}>
                        {keyword.competition === 'Baixa' ? 'Low' : 
                         keyword.competition === 'Média' ? 'Média' : 'Alto'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsCard;
