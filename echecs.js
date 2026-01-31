// Configuration du plateau
const ROWS = 10;
const COLS = 9;
const CELL_SIZE = 60;
const BOARD_PADDING = 20;

// Couleurs
const COLORS = {
    background: '#f9f6f0',
    line: '#8b7355',
    river: '#4a9eff',
    palace: '#d4b896',
    redPiece: '#dc2626',
    blackPiece: '#1f2937',
    selected: '#fbbf24',
    validMove: '#86efac'
};

// Symboles des pièces
const PIECE_SYMBOLS = {
    red: {
        general: '帥',
        guard: '仕',
        horse: '馬',
        chariot: '車',
        soldier: '兵'
    },
    black: {
        general: '將',
        guard: '士',
        horse: '馬',
        chariot: '車',
        soldier: '卒'
    }
};

// Classe Piece
class Piece {
    constructor(type, color, row, col) {
        this.type = type;
        this.color = color;
        this.row = row;
        this.col = col;
        this.hasCrossedRiver = false;
    }
    
    getSymbol() {
        return PIECE_SYMBOLS[this.color][this.type];
    }
    
    // Vérifier si une position est dans le palais
    isInPalace(row, col) {
        if (this.color === 'red') {
            return row >= 0 && row <= 2 && col >= 3 && col <= 5;
        } else {
            return row >= 7 && row <= 9 && col >= 3 && col <= 5;
        }
    }
    
    // Obtenir les mouvements valides pour cette pièce
    getValidMoves(board) {
        switch(this.type) {
            case 'general': return this.getGeneralMoves(board);
            case 'guard': return this.getGuardMoves(board);
            case 'horse': return this.getHorseMoves(board);
            case 'chariot': return this.getChariotMoves(board);
            case 'soldier': return this.getSoldierMoves(board);
            default: return [];
        }
    }
    
    // Mouvements du Général
    getGeneralMoves(board) {
        const moves = [];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // haut, bas, gauche, droite
        
        for (const [dr, dc] of directions) {
            const newRow = this.row + dr;
            const newCol = this.col + dc;
            
            // Vérifier si dans le palais
            if (this.isInPalace(newRow, newCol)) {
                const targetPiece = board.getPieceAt(newRow, newCol);
                if (!targetPiece || targetPiece.color !== this.color) {
                    moves.push([newRow, newCol]);
                }
            }
        }
        
        // Règle spéciale : les deux généraux ne peuvent pas se voir
        // Vérifier si déplacement crée une ligne de vue directe avec l'autre général
        const enemyGeneral = board.pieces.find(p => p.type === 'general' && p.color !== this.color);
        if (enemyGeneral) {
            const filteredMoves = moves.filter(([newRow, newCol]) => {
                if (newCol !== enemyGeneral.col) return true; // Pas sur la même colonne
                
                // Compter les pièces entre les deux généraux après le déplacement
                let piecesBetween = 0;
                const minRow = Math.min(newRow, enemyGeneral.row);
                const maxRow = Math.max(newRow, enemyGeneral.row);
                
                for (let r = minRow + 1; r < maxRow; r++) {
                    const piece = board.getPieceAt(r, newCol);
                    if (piece && !(piece === this)) {
                        piecesBetween++;
                    }
                }
                
                return piecesBetween > 0; // Au moins une pièce doit séparer les généraux
            });
            return filteredMoves;
        }
        
        return moves;
    }
    
    // Mouvements du Garde
    getGuardMoves(board) {
        const moves = [];
        const diagonals = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        
        for (const [dr, dc] of diagonals) {
            const newRow = this.row + dr;
            const newCol = this.col + dc;
            
            // Vérifier si dans le palais
            if (this.isInPalace(newRow, newCol)) {
                const targetPiece = board.getPieceAt(newRow, newCol);
                if (!targetPiece || targetPiece.color !== this.color) {
                    moves.push([newRow, newCol]);
                }
            }
        }
        
        return moves;
    }
    
    // Mouvements du Cheval
    getHorseMoves(board) {
        const moves = [];
        // Déplacements possibles du cheval (en L)
        const horseJumps = [
            [-2, -1, -1, 0], [-2, 1, -1, 0],  // haut
            [2, -1, 1, 0], [2, 1, 1, 0],      // bas
            [-1, -2, 0, -1], [1, -2, 0, -1],  // gauche
            [-1, 2, 0, 1], [1, 2, 0, 1]       // droite
        ];
        
        for (const [dr, dc, blockR, blockC] of horseJumps) {
            const blockRow = this.row + blockR;
            const blockCol = this.col + blockC;
            
            // Vérifier si le cheval est bloqué
            if (board.getPieceAt(blockRow, blockCol)) {
                continue; // Bloqué, ne peut pas sauter
            }
            
            const newRow = this.row + dr;
            const newCol = this.col + dc;
            
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
                const targetPiece = board.getPieceAt(newRow, newCol);
                if (!targetPiece || targetPiece.color !== this.color) {
                    moves.push([newRow, newCol]);
                }
            }
        }
        
        return moves;
    }
    
    // Mouvements de la Tour
    getChariotMoves(board) {
        const moves = [];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        
        for (const [dr, dc] of directions) {
            let newRow = this.row + dr;
            let newCol = this.col + dc;
            
            while (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
                const targetPiece = board.getPieceAt(newRow, newCol);
                
                if (targetPiece) {
                    if (targetPiece.color !== this.color) {
                        moves.push([newRow, newCol]); // Peut capturer
                    }
                    break; // Bloqué par une pièce
                } else {
                    moves.push([newRow, newCol]);
                }
                
                newRow += dr;
                newCol += dc;
            }
        }
        
        return moves;
    }
    
    // Mouvements du Soldat
    getSoldierMoves(board) {
        const moves = [];
        const riverLine = this.color === 'red' ? 5 : 4;
        
        // Direction avant basée sur la couleur
        const forwardDir = this.color === 'red' ? 1 : -1;
        
        // Toujours peut avancer
        const forwardRow = this.row + forwardDir;
        if (forwardRow >= 0 && forwardRow < ROWS) {
            const targetPiece = board.getPieceAt(forwardRow, this.col);
            if (!targetPiece || targetPiece.color !== this.color) {
                moves.push([forwardRow, this.col]);
            }
        }
        
        // Si a traversé la rivière, peut aussi se déplacer latéralement
        const hasCrossed = this.color === 'red' ? this.row >= riverLine : this.row <= riverLine;
        if (hasCrossed) {
            // Gauche
            if (this.col > 0) {
                const targetPiece = board.getPieceAt(this.row, this.col - 1);
                if (!targetPiece || targetPiece.color !== this.color) {
                    moves.push([this.row, this.col - 1]);
                }
            }
            // Droite
            if (this.col < COLS - 1) {
                const targetPiece = board.getPieceAt(this.row, this.col + 1);
                if (!targetPiece || targetPiece.color !== this.color) {
                    moves.push([this.row, this.col + 1]);
                }
            }
        }
        
        return moves;
    }
}

// Classe Board
class Board {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.pieces = [];
        this.selectedPiece = null;
        this.validMoves = [];
        this.currentPlayer = 'red';
        this.capturedPieces = { red: [], black: [] };
        this.gameOver = false;
        
        this.initializePieces();
        this.draw();
        this.setupEventListeners();
    }
    
    // Initialiser toutes les pièces
    initializePieces() {
        // Rouge (haut du plateau)
        this.pieces.push(new Piece('chariot', 'red', 0, 0));
        this.pieces.push(new Piece('horse', 'red', 0, 1));
        this.pieces.push(new Piece('guard', 'red', 0, 3));
        this.pieces.push(new Piece('general', 'red', 0, 4));
        this.pieces.push(new Piece('guard', 'red', 0, 5));
        this.pieces.push(new Piece('horse', 'red', 0, 7));
        this.pieces.push(new Piece('chariot', 'red', 0, 8));
        
        // Soldats rouges
        for (let col = 0; col < COLS; col += 2) {
            this.pieces.push(new Piece('soldier', 'red', 3, col));
        }
        
        // Noir (bas du plateau)
        this.pieces.push(new Piece('chariot', 'black', 9, 0));
        this.pieces.push(new Piece('horse', 'black', 9, 1));
        this.pieces.push(new Piece('guard', 'black', 9, 3));
        this.pieces.push(new Piece('general', 'black', 9, 4));
        this.pieces.push(new Piece('guard', 'black', 9, 5));
        this.pieces.push(new Piece('horse', 'black', 9, 7));
        this.pieces.push(new Piece('chariot', 'black', 9, 8));
        
        // Soldats noirs
        for (let col = 0; col < COLS; col += 2) {
            this.pieces.push(new Piece('soldier', 'black', 6, col));
        }
    }
    
    // Obtenir une pièce à une position donnée
    getPieceAt(row, col) {
        return this.pieces.find(p => p.row === row && p.col === col);
    }
    
    // Dessiner le plateau
    draw() {
        const ctx = this.ctx;
        
        // Fond
        ctx.fillStyle = COLORS.background;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dessiner les lignes du plateau
        this.drawBoard();
        
        // Dessiner la rivière
        this.drawRiver();
        
        // Dessiner les palais
        this.drawPalaces();
        
        // Dessiner les mouvements valides
        if (this.selectedPiece && this.validMoves.length > 0) {
            this.drawValidMoves();
        }
        
        // Dessiner les pièces
        this.drawPieces();
        
        // Surligner la pièce sélectionnée
        if (this.selectedPiece) {
            this.highlightSelectedPiece();
        }
    }
    
    // Dessiner les lignes du plateau
    drawBoard() {
        const ctx = this.ctx;
        ctx.strokeStyle = COLORS.line;
        ctx.lineWidth = 2;
        
        // Lignes horizontales
        for (let row = 0; row < ROWS; row++) {
            const y = BOARD_PADDING + row * CELL_SIZE;
            ctx.beginPath();
            ctx.moveTo(BOARD_PADDING, y);
            ctx.lineTo(BOARD_PADDING + (COLS - 1) * CELL_SIZE, y);
            ctx.stroke();
        }
        
        // Lignes verticales (divisées par la rivière)
        for (let col = 0; col < COLS; col++) {
            const x = BOARD_PADDING + col * CELL_SIZE;
            
            // Partie haute (lignes 0-4)
            ctx.beginPath();
            ctx.moveTo(x, BOARD_PADDING);
            ctx.lineTo(x, BOARD_PADDING + 4 * CELL_SIZE);
            ctx.stroke();
            
            // Partie basse (lignes 5-9)
            ctx.beginPath();
            ctx.moveTo(x, BOARD_PADDING + 5 * CELL_SIZE);
            ctx.lineTo(x, BOARD_PADDING + 9 * CELL_SIZE);
            ctx.stroke();
        }
    }
    
    // Dessiner la rivière
    drawRiver() {
        const ctx = this.ctx;
        const riverY = BOARD_PADDING + 4 * CELL_SIZE;
        const riverHeight = CELL_SIZE;
        
        ctx.fillStyle = COLORS.river + '20'; // Transparence
        ctx.fillRect(BOARD_PADDING, riverY, (COLS - 1) * CELL_SIZE, riverHeight);
        
        // Texte "RIVIÈRE"
        ctx.fillStyle = COLORS.river;
        ctx.font = 'bold 14px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('河', BOARD_PADDING + ((COLS - 1) * CELL_SIZE) / 2, riverY + riverHeight / 2 + 5);
    }
    
    // Dessiner les palais
    drawPalaces() {
        const ctx = this.ctx;
        ctx.strokeStyle = COLORS.palace;
        ctx.lineWidth = 1.5;
        
        // Palais rouge (haut)
        const redPalaceX = BOARD_PADDING + 3 * CELL_SIZE;
        const redPalaceY = BOARD_PADDING;
        const palaceWidth = 2 * CELL_SIZE;
        const palaceHeight = 2 * CELL_SIZE;
        
        // Diagonales du palais rouge
        ctx.beginPath();
        ctx.moveTo(redPalaceX, redPalaceY);
        ctx.lineTo(redPalaceX + palaceWidth, redPalaceY + palaceHeight);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(redPalaceX + palaceWidth, redPalaceY);
        ctx.lineTo(redPalaceX, redPalaceY + palaceHeight);
        ctx.stroke();
        
        // Palais noir (bas)
        const blackPalaceX = BOARD_PADDING + 3 * CELL_SIZE;
        const blackPalaceY = BOARD_PADDING + 7 * CELL_SIZE;
        
        ctx.beginPath();
        ctx.moveTo(blackPalaceX, blackPalaceY);
        ctx.lineTo(blackPalaceX + palaceWidth, blackPalaceY + palaceHeight);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(blackPalaceX + palaceWidth, blackPalaceY);
        ctx.lineTo(blackPalaceX, blackPalaceY + palaceHeight);
        ctx.stroke();
    }
    
    // Dessiner les mouvements valides
    drawValidMoves() {
        const ctx = this.ctx;
        
        for (const [row, col] of this.validMoves) {
            const x = BOARD_PADDING + col * CELL_SIZE;
            const y = BOARD_PADDING + row * CELL_SIZE;
            
            ctx.fillStyle = COLORS.validMove + '80'; // Semi-transparent
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = COLORS.validMove;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
    
    // Surligner la pièce sélectionnée
    highlightSelectedPiece() {
        const ctx = this.ctx;
        const x = BOARD_PADDING + this.selectedPiece.col * CELL_SIZE;
        const y = BOARD_PADDING + this.selectedPiece.row * CELL_SIZE;
        
        ctx.strokeStyle = COLORS.selected;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Dessiner les pièces
    drawPieces() {
        const ctx = this.ctx;
        
        for (const piece of this.pieces) {
            const x = BOARD_PADDING + piece.col * CELL_SIZE;
            const y = BOARD_PADDING + piece.row * CELL_SIZE;
            
            // Cercle de fond
            ctx.fillStyle = piece.color === 'red' ? '#fff' : '#fff';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
            
            // Bordure
            ctx.strokeStyle = piece.color === 'red' ? COLORS.redPiece : COLORS.blackPiece;
            ctx.lineWidth = 2.5;
            ctx.stroke();
            
            // Symbole de la pièce
            ctx.fillStyle = piece.color === 'red' ? COLORS.redPiece : COLORS.blackPiece;
            ctx.font = 'bold 24px system-ui';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(piece.getSymbol(), x, y);
        }
    }
    
    // Configurer les événements
    setupEventListeners() {
        this.canvas.addEventListener('click', (event) => this.handleClick(event));
        
        const resetBtn = document.querySelector('.btn-reset');
        resetBtn.addEventListener('click', () => this.resetGame());
    }
    
    // Gérer les clics
    handleClick(event) {
        if (this.gameOver) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
        
        // Convertir en coordonnées du plateau
        const col = Math.round((x - BOARD_PADDING) / CELL_SIZE);
        const row = Math.round((y - BOARD_PADDING) / CELL_SIZE);
        
        // Vérifier si dans les limites
        if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return;
        
        // Si une pièce est déjà sélectionnée
        if (this.selectedPiece) {
            // Vérifier si le clic est sur un mouvement valide
            const isValidMove = this.validMoves.some(([r, c]) => r === row && c === col);
            
            if (isValidMove) {
                this.movePiece(this.selectedPiece, row, col);
                this.selectedPiece = null;
                this.validMoves = [];
                this.draw();
                return;
            } else {
                // Désélectionner
                this.selectedPiece = null;
                this.validMoves = [];
            }
        }
        
        // Sélectionner une nouvelle pièce
        const clickedPiece = this.getPieceAt(row, col);
        
        if (clickedPiece && clickedPiece.color === this.currentPlayer) {
            this.selectedPiece = clickedPiece;
            this.validMoves = clickedPiece.getValidMoves(this);
            this.draw();
        } else {
            this.draw();
        }
    }
    
    // Déplacer une pièce
    movePiece(piece, newRow, newCol) {
        // Vérifier s'il y a une capture
        const targetPiece = this.getPieceAt(newRow, newCol);
        
        if (targetPiece) {
            // Capturer la pièce
            const capturedColor = targetPiece.color === 'red' ? 'black' : 'red';
            this.capturedPieces[capturedColor].push(targetPiece.getSymbol());
            this.pieces = this.pieces.filter(p => p !== targetPiece);
            
            // Vérifier victoire
            if (targetPiece.type === 'general') {
                this.gameOver = true;
                this.showVictory(this.currentPlayer);
            }
            
            // Mettre à jour l'affichage des captures
            this.updateCapturesDisplay();
        }
        
        // Déplacer la pièce
        piece.row = newRow;
        piece.col = newCol;
        
        // Changer de joueur
        this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
        this.updateTurnDisplay();
    }
    
    // Mettre à jour l'affichage du tour
    updateTurnDisplay() {
        const turnIndicator = document.querySelector('.current-player');
        const playerText = this.currentPlayer === 'red' ? 'Rouge 🔴' : 'Noir ⚫';
        turnIndicator.textContent = `Tour : ${playerText}`;
    }
    
    // Mettre à jour l'affichage des captures
    updateCapturesDisplay() {
        const redCapturesDiv = document.querySelector('.captures-red .captured-pieces');
        const blackCapturesDiv = document.querySelector('.captures-black .captured-pieces');
        
        redCapturesDiv.textContent = this.capturedPieces.red.join(' ');
        blackCapturesDiv.textContent = this.capturedPieces.black.join(' ');
    }
    
    // Afficher la victoire
    showVictory(winner) {
        const winnerText = winner === 'red' ? 'Rouge 🔴' : 'Noir ⚫';
        const turnIndicator = document.querySelector('.current-player');
        turnIndicator.textContent = `🎉 Victoire : ${winnerText} !`;
        turnIndicator.style.color = '#fbbf24';
        turnIndicator.style.fontSize = '2rem';
    }
    
    // Réinitialiser le jeu
    resetGame() {
        this.pieces = [];
        this.selectedPiece = null;
        this.validMoves = [];
        this.currentPlayer = 'red';
        this.capturedPieces = { red: [], black: [] };
        this.gameOver = false;
        
        this.initializePieces();
        this.updateTurnDisplay();
        this.updateCapturesDisplay();
        
        // Réinitialiser le style du tour
        const turnIndicator = document.querySelector('.current-player');
        turnIndicator.style.color = '';
        turnIndicator.style.fontSize = '';
        
        this.draw();
    }
}

// Initialisation
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('xiangqi-board');
    new Board(canvas);
});
