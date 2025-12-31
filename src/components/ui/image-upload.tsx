import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
    onImageSelect: (file: File | null) => void
    preview?: string | null
    maxSizeMB?: number
    initialImageUrl?: string // Add initialImageUrl prop
    id: string // Add id prop
    labelText: string // Add labelText prop
}

export function ImageUpload({ onImageSelect, preview, maxSizeMB = 5, initialImageUrl, id, labelText }: ImageUploadProps) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(preview || initialImageUrl || null) // Use initialImageUrl
    const [error, setError] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setPreviewUrl(preview || initialImageUrl || null);
    }, [preview, initialImageUrl]);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setError('')

        if (!file) return

        // Validações
        if (!file.type.startsWith('image/')) {
            setError('Por favor, selecione uma imagem válida')
            return
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`Imagem muito grande (máximo ${maxSizeMB}MB)`)
            return
        }

        setSelectedImage(file)
        onImageSelect(file)

        // Criar preview
        const reader = new FileReader()
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleRemoveImage = () => {
        setSelectedImage(null)
        setPreviewUrl(null)
        onImageSelect(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className="space-y-2">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id={id}
            />

            <label htmlFor={id}>
                <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                    <div className="p-6 text-center">
                        {previewUrl ? (
                            <div className="space-y-2">
                                <img
                                    src={previewUrl}
                                    alt={`Preview do ${labelText.toLowerCase()}`}
                                    className="w-24 h-24 object-cover rounded-lg mx-auto"
                                />
                                <p className="text-sm text-gray-600">Clique para alterar</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
                                <p className="text-sm text-gray-600">Clique para adicionar {labelText.toLowerCase()}</p>
                            </div>
                        )}
                    </div>
                </Card>
            </label>

            {selectedImage && (
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm truncate">{selectedImage.name}</span>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveImage}
                        className="h-6 w-6 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    )
}
