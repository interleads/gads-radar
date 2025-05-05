
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
  'Baixa': 'bg-green-500 text-white',
  'Média': 'bg-yellow-500 text-white',
  'Alta': 'bg-red-500 text-white'
};

const gradeBackgroundColor = {
  'A': 'bg-green-500',
  'B': 'bg-brand-blue-500',
  'C': 'bg-yellow-500',
  'D': 'bg-red-500'
};

const ResultsCard: React.FC<ResultsCardProps> = ({ regionGrade, location, niche, keywordsData }) => {
  // Calculate total search volume
  const totalSearchVolume = keywordsData.reduce((sum, item) => sum + item.searchVolume, 0);
  
  return (
    <div className="animate-fade-in">
      <Card className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-lg">
        {/* Header section with grade and search volume following the image model */}
        <div className="flex flex-col md:flex-row items-center p-6 bg-white">
          {/* Grade indicator circle */}
          <div className="md:w-1/4 flex items-center justify-center mb-4 md:mb-0">
            <div className={`
              w-36 h-36 rounded-full flex items-center justify-center
              text-[6rem] font-bold text-white
              ${gradeBackgroundColor[regionGrade.grade]} 
              shadow-lg`}>
              {regionGrade.grade}
            </div>
          </div>
          
          {/* Search volume and profitability message */}
          <div className="md:w-3/4 flex flex-col md:pl-6">
            <div className="mb-4">
              <h2 className="text-5xl font-bold text-slate-800">
                {totalSearchVolume.toLocaleString()} buscas
              </h2>
            </div>
            <div className="bg-teal-500 p-4 text-white w-full rounded-lg">
              <div className="flex items-center gap-2">
                <Rocket className="w-6 h-6 text-white" />
                <p className="font-medium text-xl">
                  Alto potencial de lucratividade em anúncios no Google
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Keywords section with clear separation from header */}
        <div className="border-t border-gray-200"></div>
        
        <CardContent className="p-6 bg-white">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Palavras-chave principais</h3>
          
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="text-gray-700 font-medium text-lg py-4">Palavra-chave</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-lg py-4">Volume de busca</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-lg py-4">CPC médio (R$)</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-lg py-4">Concorrência</TableHead>
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
                        {keyword.competition === 'Baixa' ? 'Baixa' : 
                         keyword.competition === 'Média' ? 'Média' : 'Alta'}
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
