import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Rocket, TrendingUp, Search, Hash } from 'lucide-react';
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
  primaryKeywordVolume: number;
  totalVolume: number;
  keywordCount: number;
  annualVolume?: number;
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

const ResultsCard: React.FC<ResultsCardProps> = ({
  regionGrade,
  location,
  niche,
  keywordsData,
  primaryKeywordVolume = 0,
  totalVolume = 0,
  keywordCount = 0,
  annualVolume = 0
}) => {
  // Fallback: se não tiver os novos valores, calcular do keywordsData
  const displayPrimaryVolume = primaryKeywordVolume || keywordsData[0]?.searchVolume || 0;
  const displayTotalVolume = totalVolume || keywordsData.reduce((sum, k) => sum + k.searchVolume, 0);
  const displayKeywordCount = keywordCount || keywordsData.length;
  const displayAnnualVolume = annualVolume || displayPrimaryVolume * 12;
  return (
    <div className="animate-fade-in">
      <Card className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-lg">
        {/* Header section with grade and search volume */}
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
          
          {/* Search volume and stats */}
          <div className="md:w-3/4 flex flex-col md:pl-6 gap-4">
            {/* Primary keyword volume - destacado */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Search className="w-4 h-4" />
                <span>Volume da keyword principal "{niche}"</span>
              </div>
              <h2 className="font-bold text-slate-800 text-4xl">
                {displayPrimaryVolume.toLocaleString()} buscas/mês
              </h2>
            </div>

            {/* Stats row - Total mensal destacado como o Google */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 px-4 py-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-teal-600" />
                <div>
                  <span className="text-sm text-teal-700 font-medium">Total mensal (todas keywords)</span>
                  <p className="font-bold text-teal-800 text-xl">{displayTotalVolume.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                <Hash className="w-5 h-5 text-teal-600" />
                <div>
                  <span className="text-sm text-gray-500">Keywords analisadas</span>
                  <p className="font-bold text-slate-800">{displayKeywordCount}</p>
                </div>
              </div>
            </div>

            {/* Profitability message */}
            <div className="bg-teal-500 p-4 text-white w-full rounded-lg">
              <div className="flex items-center gap-2">
                <Rocket className="w-6 h-6 text-white" />
                <p className="font-medium text-lg">
                  {regionGrade.grade === 'A' && 'Excelente potencial! Alta demanda para anúncios no Google.'}
                  {regionGrade.grade === 'B' && 'Bom potencial de lucratividade em anúncios no Google.'}
                  {regionGrade.grade === 'C' && 'Potencial moderado. Estratégia bem planejada pode trazer resultados.'}
                  {regionGrade.grade === 'D' && 'Baixa demanda. Considere expandir a área de atuação.'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Keywords section */}
        <div className="border-t border-gray-200"></div>
        
        <CardContent className="p-6 bg-white">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Top {keywordsData.length} palavras-chave
          </h3>
          
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
                  <TableRow 
                    key={index} 
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${index === 0 ? "border-l-4 border-l-teal-500" : ""}`}
                  >
                    <TableCell className={`font-medium text-gray-700 ${index === 0 ? "font-bold" : ""}`}>
                      {keyword.keyword}
                      {index === 0 && <Badge className="ml-2 bg-teal-500 text-white">Principal</Badge>}
                    </TableCell>
                    <TableCell className="text-right text-gray-700 font-semibold">
                      {keyword.searchVolume.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-gray-700">
                      {keyword.cpc.toFixed(2)}
                    </TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsCard;
